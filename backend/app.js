// Check Database config existed!? if not, app won't be started.
const fs = require('fs')
const db = fs.existsSync('./configs/db-mysql.conf.js') 
  ? require('./libs/db-mysql2-promise')(require('./configs/db-mysql.conf')) 
  : false

if(db) {
  const Koa = require('koa')
  const Router = require('koa-router')
  
  const controllers = {
    todo(ctx) {
      ctx.body = "Hello Todo App"
    } 
  }
  
  const routes = new Router()
    .get('/', (ctx) => controllers.todo(ctx))
  
  new Koa()
    .use(routes.routes())
    .listen(3000)

} else {
  console.log('Database not connected, app exited')
}
