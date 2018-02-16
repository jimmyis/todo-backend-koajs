
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
      if (result.success) {
        ctx.body = result
      } else {
        ctx.response.status = 204
      }
    },
    // Controller to List a todo list by id
    async listById(ctx) {
      if(ctx.params.id) {
        const result = await models.listById(ctx.params.id)
        if (result.success) {
          ctx.body = result
        } else {
          ctx.response.status = 204
        }
      }
    },
    // Controller to Replace a todo list by id with the new one
    async replaceById(ctx) {
      if(ctx.params.id && ctx.request.body) {
        const query = {
          id: ctx.params.id,
          body: ctx.request.body
        }
        models.replaceById(query) // Passing id parameter and POST body as query
        .then(result => {
          if(result.success) {
            // ctx.response.status = 201
            ctx.body = result
          } else {
            ctx.response.status = 204
            ctx.body = result.error
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
  }
}