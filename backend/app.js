const Koa = require('koa')
const Router = require('koa-router')

const routes = new Router()
  .get('/', (ctx) => {
    ctx.body = 'Hello Todo App'
  })

new Koa()
  .use(routes.routes())
  .listen(3000)