let oOutstockBtn = document.querySelector('#outstockBtn');
oOutstockBtn.addEventListener('click', onOutstock, false);
function onOutstock(ev) {
  let val = document.querySelector('#outstockInput').value;

  if (!val.trim()) {
    return alert('取件Id不能为空！');
  }

  axios.post('/outstock', {
    val
  })
    .then(function (res) {
      let { code, message } = res;
      if (code === 1) {
        alert('出库成功！');
      } else {
        alert(message);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}