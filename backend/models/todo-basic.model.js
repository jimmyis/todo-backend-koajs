module.exports = function (db) {
  return {
    // Model to Create a new todo list
    async create(payload) {
      // payload should be body content after parsed from body parser middleware
        // eg. 'ctx.request.body' from 'koa-bodyparser'
      if (payload) {
        const description = payload.description ? payload.description : null
        const tags = payload.body ? payload.tags : null
        if (description) {
          await db.query(`INSERT INTO list (description, tag) 
            VALUES (?, ?)`,
            [description, tags])
          return { success: true }
        } else {
          return { success: false, error: 'No description'}
        }
      } else {
        return { success: false, error: 'No request body'}
      }
    },
    // Model to List all todo lists
    async listAll() {
      const [ rows , fields ] = await db.query(`SELECT * FROM list`)
      if(rows.length > 0) {
        return {
          success: true, 
          payload: rows,
        }
      } else {
        return {
          success: false
        }
      }
    },
    // Model to List a todo list by id
    async listById(id) {
      const [ rows , fields ] = await db.query(`SELECT * FROM list WHERE id = ?`, [id] )
      if(rows.length > 0) {
        return {
          success: true, 
          payload: rows,
        }
      } else {
        return {
          success: false
        }
      }
    },
    // Model to Replace a todo list by id with the new one
    async replaceById(query) {
      // query must contain both id and at least 'description' key in body
      if (query) {

        const set_list = function (body) {
          let SET = []
          for (let key in body) {
            SET.push(key + " = \'" + body[key] + "\'")
          }
          SET = SET.join(', ').toString()

          return SET
        }

        const [result] = await db.query(`UPDATE list 
                SET ${set_list(query.body)}
                WHERE id = ?`,
                [query.id])
        if(result.changedRows > 0) {
          return { success: true }
        } else {
          return { success: false, error: 'Nothing changed'}
        }
      } else {
        return { success: false, error: 'No query or invalid'}
      }
    },
  }
}