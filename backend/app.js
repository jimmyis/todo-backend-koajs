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