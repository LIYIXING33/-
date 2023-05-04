let oInstockBtn = document.querySelector('#instockBtn');
oInstockBtn.addEventListener('click', onInstock, false);
function onInstock(ev) {
  let name = document.querySelector('#name').value;
  let phone = document.querySelector('#phone').value;
  let goodsName = document.querySelector('#goodsName').value;

  if (!name) {
    return alert('收件人姓名不能为空！');
  } else if (!phone) {
    return alert('收件人手机号不能为空！');
  } else if(!goodsName) {
    return alert('商品名称不能为空！');
  }

  axios.post('/instock', {
    name,
    phone,
    goodsName
  })
    .then(function (res) {
      let { code, data, message } = res;
      if (code === 1) {
        alert('入库成功！');
      } else {
        alert(message);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}