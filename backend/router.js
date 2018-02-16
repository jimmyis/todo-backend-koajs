const Router = require('koa-router')

module.exports = function (db) {
  const controllers = require('./controllers/todo-basic.ctrl')(db)
  
  return new Router()
    .get('/', (ctx) => ctx.body = `Nothing's here`)

    // This route will create a todo list
    .post('/todo', ctx => controllers.create(ctx))

    // This route will send back all todo lists
    .get('/todo', async ctx => await controllers.listAll(ctx))

    // This route will send back a todo list by id as the parameter
    .get('/todo/:id', ctx => controllers.listById(ctx))
    
    // This route will replace a todo list by id with a new one
    .put('/todo/:id', ctx => controllers.replaceById(ctx))

    // This route will delete a todo list by id
    .delete('/todo/:id', ctx => controllers.removeById(ctx))
} 