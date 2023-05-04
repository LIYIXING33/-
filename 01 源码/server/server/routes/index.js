const Login = require('./login');
const Instock = require('./instock');
const Outstock = require('./outstock');
const Errstock = require('./errstock');
const Users = require('./users');
const Register = require('./register');
const Customer = require('./customer');

const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const { secret } = require('../config');
const { query } = require('../utils/querySql');


module.exports =  (router) => {
  router.get('/', async function (ctx, next) {
    ctx.state = {
      title: '菜鸟后台管理系统'
    };
    
    await ctx.render('index', {title: ctx.state});
  });

  router.get('/queryorder', async function (ctx, next) {
    let { token } = ctx.request.header;
    let { value } = ctx.request.query;

    try {
      let userInfo = jwt.verify(token, secret);
      let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      let arr = [];
      
      // , G.is_out, G.instock_time, G.outstock_time
      // 如果是手机号
      if (reg_tel.test(value)) {
        let customerList = await query(`SELECT id FROM customer WHERE phone='${value}'`);
    
        if (customerList.length === 0) throw new Error('没有这个手机号的记录');
        // 找到这个商品
        let goodsList = await query(`SELECT G.id, G.name AS 'good_name', A.name AS 'admin_name', C.name AS 'customer_name' FROM goods G, admin_user A, customer C WHERE G.customer_id=${customerList[0].id} AND C.id=${customerList[0].id} AND A.id=G.admin_id`);
        
        if (goodsList.length > 0) {
          for (let i=0; i<goodsList.length; i++) {
            let _item = { ...goodsList[i] };
            
            let sgList = await query(`SELECT * FROM storehouse_goods WHERE goods_id=${_item.id}`);
            if (sgList.length === 0) throw new Error('没有找到此库存');
            let storeList = await query(`SELECT * FROM storehouse WHERE id=${sgList[0].storehouse_id}`);
            if (storeList.length === 0) throw new Error('没有找到此仓库');
            // 找这个仓库
  
            _item.store_id = storeList[0].id;
            _item.store_code = storeList[0].name;
            _item.sg_id = sgList[0].id;
            _item.is_out = sgList[0].is_out;
            _item.instock_time = sgList[0].instock_time;
            _item.outstock_time = sgList[0].outstock_time;

            arr.push(_item);
          }
          
        }
        console.log(goodsList);
      } else {
        // 使用取件码查询
        // 1. 查询库存表是否有这个仓库
        let storeList = await query(`SELECT id, name FROM storehouse WHERE name='${value}'`);
        if (storeList.length === 0) throw new Error(`${value}这个取件码无效`);
        // 2. 找到这个库存
        let sgList = await query(`SELECT * FROM storehouse_goods WHERE storehouse_id=${storeList[0].id}`);
        if (sgList.length === 0) throw new Error(`没有找到这个库存`);
        // 3. 找到这个商品
        let goodsList = await query(`SELECT G.id, G.name AS 'good_name', A.name AS 'admin_name', C.name AS 'customer_name' FROM goods G, admin_user A, customer C WHERE G.id=${sgList[0].id} AND C.id=G.customer_id AND A.id=G.admin_id`);
        if (goodsList.length > 0) {
          arr.push(goodsList[0]);
          arr[0].store_id = storeList[0].id;
          arr[0].store_code = storeList[0].name;
          arr[0].sg_id = sgList[0].id;
          arr[0].is_out = sgList[0].is_out;
          arr[0].instock_time = sgList[0].instock_time;
          arr[0].outstock_time = sgList[0].outstock_time;
        }
      }

      ctx.body = {
        code: arr.length > 0? 1: -1,
        data: arr,
        message: arr.length > 0? 'query ok': '没有找到指定的库存'
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
  Login(router);
  Users(router);
  Register(router);
  Instock(router);
  Outstock(router);
  Errstock(router);
  Customer(router);
}
