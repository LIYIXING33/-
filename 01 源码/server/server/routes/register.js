const { query } = require('../utils/querySql');
var dayjs = require('dayjs');

module.exports =  (router) => {
  router.get('/register', async function (ctx) {
    ctx.state = {
      title: '菜鸟统一注册'
    };

    await ctx.render('register', {title: ctx.state});
  });

  router.post('/register', async function (ctx) {
    let { name, password, password2, phone, username } = ctx.request.body;
    let adminUserList = await query('select * from admin_user');
    let time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    if (adminUserList.some(item => item.username === username)) {
      ctx.body = '该用户已经注册'
    } else {
      try {
        let str = `INSERT INTO admin_user(username, password, name, phone, time) VALUES('${username}', '${password}', '${name}', '${phone}', '${time}')`;
        console.log(str);
        await query(str);
        ctx.body = {
          code: 1,
          data: null,
          message: '注册成功！'
        };
      } catch(err) {
        ctx.body = {
          code: -1,
          data: null,
          message: err.message
        };
      }
    }

  });
}
