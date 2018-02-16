const Router = require('koa-router')

module.exports = function (db) {
  const controllers = require('./controllers/todo-basic.ctrl')(db)
  
  return new Router()
    .get('/', (ctx) => ctx.body = `Nothing's here`)

    // This route will create a todo list
    .post('/todo', ctx => controllers.create(ctx))

    // This route will send back all todo lists
    .get('/todo', async ctx => await controllers.listAll(ctx))
} 