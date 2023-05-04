const jwt = require('jsonwebtoken');
var dayjs = require('dayjs');
const { secret } = require('../config');
const { query } = require('../utils/querySql');


module.exports =  (router) => {
  router.get('/instock', async function (ctx, next) {
    ctx.state = {
      title: '商品入库'
    };
    
    await ctx.render('instock', {title: ctx.state});
  });

  router.post('/instock', async function (ctx, next) {
    let { token } = ctx.request.header;
    let { name, phone, goodsName } = ctx.request.body;
    try {
      let userInfo = jwt.verify(token, secret);
      let time = dayjs().format('YYYY-MM-DD HH:mm:ss');
      console.log(name, phone, goodsName, userInfo);
      // 1. 先用手机号查customer表，是否有此用户
      let customerList = await query(`select id, phone from customer`);
      let curCustomer = customerList.find(item => item.phone == phone);
      let customerId;
      
      if (!curCustomer) {
        // 先加一下这个用户
        customerId = customerList.length + 1;
        await query(`insert into customer(id, name, phone, time) values(${customerId}, '${name}', '${phone}', '${time}')`);
      } else {
        customerId = curCustomer.id;
      }
      
      // 2. 找一个空的货架单元
      // 把所有库存的仓库都找出来
      let storehouseGoodsList = await query(`select storehouse_id from storehouse_goods where is_out<>1`);
      let storehouseList = await query(`select id from storehouse`);
      let emptyStoreId = '';
      if (storehouseGoodsList.length > 0) {
        let emptyStoreList = storehouseList.filter(item => !storehouseGoodsList.some(it => it.storehouse_id === item.id))
        if (emptyStoreList.length === 0) throw new Error('没有空余的货架，请出库以腾出空位！');
        emptyStoreId = emptyStoreList[0].id;
      } else {
        emptyStoreId = storehouseList[0].id;
      }
      
      // 写入出库
      let goodsList = await query(`select id from goods`);
      let goodsId = goodsList.length + 1;
      await query(`insert into goods(id, name, customer_id, admin_id) values(${goodsId}, '${goodsName}', ${customerId}, ${userInfo.id})`);
      await query(`insert into storehouse_goods(goods_id, storehouse_id, is_out, instock_time) values(${goodsId}, ${emptyStoreId}, 0 ,'${time}');`);
      ctx.body = {
        code: 1,
        data: null,
        message: '商品入库成功！'
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
