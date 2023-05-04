function init() {
  let username = localStorage.getItem('username');
  let oSearchBtn = document.querySelector('#searchBtn');
  oSearchBtn.addEventListener('click', function(ev) {
    let oSearchInput = document.querySelector('#searchInput');
    let val = oSearchInput.value;
    if (!val) return alert('请输入收件人手机号或取件码');

    axios.get('/queryorder', {
      params: {
        value: val
      }
    })
      .then(function (res) {
        let { code, data, message } = res;
        if (code === 1) {
          let tem = '';
          data.forEach(item => {
            tem += `<tr>\
              <th scope="row">${item.sg_id}</th>\
              <td>${item.good_name}</td>\
              <td>${item.customer_name}</td>\
              <td>${item.store_code}</td>\
              <td>${item.admin_name}</td>\
              <td>${item.is_out === 0? '否': '是'}</td>\
              <td>${item.instock_time}</td>\
              <td>${item.outstock_time}</td> \
            </tr>`
          });
          document.querySelector('#tableBody').innerHTML = tem;
        } else {
          document.querySelector('#tableBody').innerHTML = '';
          alert(message);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }, false);
}



init();
