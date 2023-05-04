let oLogin = document.querySelector('#login');
oLogin.addEventListener('click', onLogin, false);
function onLogin(ev) {
  let username = document.querySelector('#username').value;
  let password = document.querySelector('#password').value;
  
  if (!username) {
    return alert('用户名不能为空！');
  } else if (!password) {
    return alert('密码不能为空！');
  }

  axios.post('/login', {
    username,
    password
  })
  .then(function (res) {
    let { code, data, message } = res;
    if (code === 1) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      location.href = '/';
    } else {
      alert(message);
    }
  })
  .catch(function (err) {
    console.log(err);
  });
}