const jwt = require('jsonwebtoken');
var dayjs = require('dayjs');
const { secret } = require('../config');
const { query } = require('../utils/querySql');


module.exports =  (router) => {
  router.get('/errstock', async function (ctx, next) {
    ctx.state = {
      title: '库存异常'
    };
    
    await ctx.render('errstock', {title: ctx.state});
  });
  
  router.get('/errstock-msg', async function (ctx, next) {
    let { token } = ctx.request.header;
    let { val } = ctx.request.query;
    console.log(val);
    try {
      let userInfo = jwt.verify(token, secret);
      let arr = [];
      let timeWhere = '';
      switch (val) {
        case '1': // 超时一周
          timeWhere = `instock_time < '${ dayjs(dayjs() - 7*24*60*60*1000).format('YYYY-MM-DD HH:mm:ss') }'`;
          break;
        case '2': // 超时3周
          timeWhere = `instock_time < '${ dayjs(dayjs() - 3*7*24*60*60*1000).format('YYYY-MM-DD HH:mm:ss') }'`;
          break;
        case '3': // 超时一个月
          timeWhere = `instock_time < '${ dayjs(dayjs() - 30*24*60*60*1000).format('YYYY-MM-DD HH:mm:ss') }'`;
          break;
        case '4': // 超时三个月
          timeWhere = `instock_time < '${ dayjs(dayjs() - 90*24*60*60*1000).format('YYYY-MM-DD HH:mm:ss') }'`;
          break;
        case '5': // 超时一年
          timeWhere = `instock_time < '${ dayjs(dayjs() - 365*24*60*60*1000).format('YYYY-MM-DD HH:mm:ss') }'`;
          break;
      }
      let sgList = await query(`select * from storehouse_goods where is_out<>1 and ${timeWhere}`);
      for (let i=0; i<sgList.length; i++) {
        let item = { ...sgList[i], instock_time: dayjs(sgList[i].instock_time).format('YYYY-MM-DD HH:mm:ss') };
        let storeList = await query(`select id, name from storehouse where id=${item.storehouse_id}`);
        let goodsList = await query(`select G.id, G.name AS 'good_name', A.name AS 'admin_name', C.name AS 'customer_name' from goods G, admin_user A, customer C where G.id=${item.goods_id} AND C.id=G.customer_id AND A.id=G.admin_id`);
        if (goodsList.length > 0) {
          item.store_id = storeList[0].id;
          item.store_code = storeList[0].name;
          item.admin_name = goodsList[0].admin_name;
          item.customer_name = goodsList[0].customer_name;
          item.good_name = goodsList[0].good_name;
        }
        arr.push(item);
      }
      

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
