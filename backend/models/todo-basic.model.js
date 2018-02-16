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
  }
}