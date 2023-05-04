init();

function init() {
  let submitBtn = document.querySelector('#submitBtn');

  submitBtn.addEventListener('click', onSubmit);
  function onSubmit() {
    let option = getFormData('form');
    if (!option.username.trim()) {
      return alert('用户名不能为空！');
    } else if(!option.password.trim()) {
      return alert('密码不能为空！');
    } else if(!option.password2.trim()) {
      return alert('确认密码不能为空！');
    } else if(!option.name.trim()) {
      return alert('真实名字不能为空！');
    } else if(!option.phone.trim()) {
      return alert('手机号不能为空！');
    } else if(option.password !== option.password2) {
      return alert('密码和重复密码不相同！');
    } else if(!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(option.phone)) {
      return alert('手机号格式不正确！');
    }

    axios.post('/register', option)
    .then(function (res) {
      let { code, data, message } = res;
      if (code === 1) {
        if (confirm('注册成功，是否跳转到登录页面？')) {
          location.href = '/login';
        }
      } else {
        alert(message);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  }
}