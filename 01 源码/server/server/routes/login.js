const { secret } = require('../config');
const { query } = require('../utils/querySql');
const jwt = require("jsonwebtoken");

module.exports =  (router) => {
  router.get('/login', async function (ctx, next) {
    ctx.state = {
      title: '菜鸟统一登录'
    };

    await ctx.render('login', {title: ctx.state});
  });

  router.post('/login', async function (ctx, next) {
    let { username, password } = ctx.request.body;

    try {
      let adminUserList = await query(`SELECT id, username, name, phone FROM admin_user WHERE username='${username}' && password='${password}'`);
      if (adminUserList.length > 0) {
        let token = jwt.sign({ ...adminUserList[0] }, secret);
        ctx.body = {
          code: 1,
          data: {
            token,
            username: username
          },
          message: '登录成功'
        }
      } else {
        ctx.body = {
          code: -1,
          data: null,
          message: '当前用户为注册或密码错误！'
        }
      }
    } catch(err) {
      console.log(err)
    }
  });
}
