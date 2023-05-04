function init() {
  let oSearchBtn = document.querySelector('#searchBtn');
  
  oSearchBtn.addEventListener('click', function(ev) {
    let val = document.querySelector('#searchInput').value;

    axios.get('/customer-info', {
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
              <td>${item.name}</td>\
              <td>${item.phone}</td>\
              <td>${item.time}</td>\
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
