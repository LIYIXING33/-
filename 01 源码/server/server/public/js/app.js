(function(win) {
  let token = win.localStorage.getItem('token');
  if (!token && !['login', 'register'].includes(win.location.pathname.replace('/', ''))) {
    win.location.href = '/login';
  }
  
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = win.localStorage.getItem('token');
    config.headers['token'] = token;
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  
  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data;
    if (data.code === 401) {
      localStorage.setItem('token', '');
      alert('登录已失效，即将跳到登录界面！');
      location.href= "/login";
    } else {
      return response.data;
    }
    
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  function getFormData(formName) {
    let forms = document.forms, formsLen = forms.length, i, j, form, formEleLen, formEle, result = Object.create(null);
    for (i=0; i<formsLen; i++) {
      form = forms[i];
      if (form.localName === formName) {
        formEleLen = form.length;
        for (j=0; j<formEleLen; j++) {
          formEle = form[j];
          
          if (formEle.name) {
            result[formEle.name] = formEle.value;
          }
        }

        break;
      }
    }

    return result;
  }

  win.getFormData = getFormData;
})(window, axios);