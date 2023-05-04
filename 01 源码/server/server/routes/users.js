const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports =  (router) => {
  router.get('/user', async function (ctx, next) {
    let { token } = ctx.request.header
    console.log(jwt.verify(token, secret));
    ctx.body = 'this a users response!';
  })
}
