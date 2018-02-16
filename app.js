// Check Database config existed!? if not, app won't be started.
const fs = require('fs')
const db = fs.existsSync('./configs/db-mysql.conf.js') 
  ? require('./libs/db-mysql2-promise')(require('./configs/db-mysql.conf'))
  : false

if(db) {

  const Koa = require('koa')
  const bodyparser = require('koa-bodyparser')
  const router = require('./router')(db)
  
  new Koa()
    .use(bodyparser())
    .use(router.routes())
    .listen(3000)

} else {
  console.log('Database not connected, app exited')
}
