const jwt = require('jsonwebtoken');
var dayjs = require('dayjs');
const { secret } = require('../config');
const { query } = require('../utils/querySql');


module.exports =  (router) => {
  router.get('/customer', async function (ctx, next) {
    ctx.state = {
      title: '客户信息'
    };
    
    await ctx.render('customer', {title: ctx.state});
  });
  
  router.get('/customer-info', async function (ctx, next) {
    let { token } = ctx.request.header;
    let { val } = ctx.request.query;
    let queryWhere = '';
    if (val) {
      queryWhere = `where name like '%${val}%'`
    }
    try {
      let userInfo = jwt.verify(token, secret);
      let arr = await query(`select * from customer ${queryWhere}`);
      arr = arr.map(item => ({ ...item, time: dayjs(item.time).format('YYYY-MM-DD HH-mm-ss') }))
      ctx.body = {
        code: 1,
        data: arr,
        message: arr.length > 0? 'query ok': '没有数据了'
      }
    } catch(err) {
      if (err.name === 'JsonWebTokenError') {
        ctx.body = {
          code: 401,
          data: null,
          message: '登录失效'
        }
      } else {
        ctx.body = {
          code: -1,
          data: null,
          message: err.message
        }
      }
    }
  });
}
