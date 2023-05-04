// const initSql = require('../sqls/init.sql');
const { spawn, exec } = require('child_process');
const { user } = require('../config');

/* let cp = spawn('mysql', ['-u', 'root', '-p', '>', '../sqls/init.sql']);
let result = '';

cp.stdout.on('data', chunk => {
  result += chunk;
});

cp.stdout.on('end', () => {
  console.log(result);
});

cp.stderr.on('data', chunk => {
  console.log(chunk.toString());
}) */

exec(`mysql -u ${user} -p  <sqls/init.sql`, (err, stdout, stderr) => {
  if (err) throw err;
  if (stderr) throw new Error(stderr);
  console.log('初始化数据库成功！');
});
