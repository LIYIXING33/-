function init() {
  let oSelectBtn = document.querySelector('#selector');
  
  oSelectBtn.addEventListener('change', function(ev) {
    let val = ev.target.value;

    axios.get('/errstock-msg', {
      params: {
        val: val
      }
    })
      .then(function (res) {
        let { code, data, message } = res;
        if (code === 1) {
          let tem = '';
          data.forEach(item => {
            tem += `<tr>\
              <th scope="row">${item.id}</th>\
              <td>${item.good_name}</td>\
              <td>${item.customer_name}</td>\
              <td>${item.store_code}</td>\
              <td>${item.admin_name}</td>\
              <td>${item.is_out === 0? '否': '是'}</td>\
              <td>${item.instock_time}</td>\
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
