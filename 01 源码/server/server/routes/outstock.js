const jwt = require('jsonwebtoken');
var dayjs = require('dayjs');
const { secret } = require('../config');
const { query } = require('../utils/querySql');


module.exports =  (router) => {
  router.get('/outstock', async function (ctx, next) {
    ctx.state = {
      title: '商品入库'
    };
    
    await ctx.render('outstock', {title: ctx.state});
  });

  router.post('/outstock', async function (ctx, next) {
    let { token } = ctx.request.header;
    let { val } = ctx.request.body;
    try {
      let userInfo = jwt.verify(token, secret);
      let sgList = await query(`select id, goods_id, is_out from storehouse_goods where id=${val}`);
      if (sgList.length === 0) throw new Error('库存id无效');
      if (sgList[0].is_out === 1) throw new Error('该商品已经出库');
      let time = dayjs().format('YYYY-MM-DD HH:mm:ss');
      await query(`UPDATE storehouse_goods SET is_out=1, outstock_time='${time}' where id=${val}`);

      ctx.body = {
        code: 1,
        data: null,
        message: '出库成功'
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
