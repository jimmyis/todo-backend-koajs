const Koa = require('koa')

new Koa()
  .use(ctx => {
    ctx.body = "Hello world"
  })
  .listen(3000)