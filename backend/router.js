const Router = require('koa-router')

module.exports = function (db) {
  const controllers = require('./controllers/todo-basic.ctrl')(db)
  
  return new Router()
    .get('/', (ctx) => controllers.todo(ctx))
    .post('/todo', ctx => controllers.create(ctx))
} 