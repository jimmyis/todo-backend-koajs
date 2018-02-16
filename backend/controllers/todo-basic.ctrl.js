
module.exports = function (db) {
  const models = require('../models/todo-basic.model')(db)
  return {
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
    }
  }
}