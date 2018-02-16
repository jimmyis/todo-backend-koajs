
module.exports = function (db) {
  const models = require('../models/todo-basic.model')(db)
  return {
    // Controller to Create a new todo list
    create(ctx) {
      if(ctx.request.body) {
        models.create(ctx.request.body) // Passing POST body as payload
        .then(result => {
          if(result.success) {
            ctx.response.status = 201
          } else {
            ctx.response.status = 204
          }
        })
        .catch(error => {
          console.log(error)
        })
      } else {
        ctx.response.status = 400
        console.log('Parsed body error')
      }
    },
    // Controller to List all todo lists
    async listAll(ctx) {
      const result = await models.listAll()
      if (result.succes) {
      if (result.success) {
        ctx.body = result
      } else {
        ctx.response.status = 204
      }
    },
  }
}