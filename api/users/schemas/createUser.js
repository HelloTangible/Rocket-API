const Joi = require('joi')

const createUserSchema = Joi.object({
  email: Joi.string().email(),
  email_verified: Joi.bool(),
  picture: Joi.string(),
  name: Joi.string(),
  user_id: Joi.string(),
  admin: Joi.bool()
})

module.exports = createUserSchema
