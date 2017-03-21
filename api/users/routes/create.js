const Boom = require('boom')
const User = require('../model/User')
const createUserSchema = require('../schemas/createUser')
const createToken = require('../util/token')

module.exports = {
  method: 'POST',
  path: '/api/users',
  config: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    },
    auth: false,
    handler: (req, res) => {
      let user = new User()
      user.user_id = req.payload.user_id
      user.email = req.payload.email
      user.email_verified = req.payload.email_verified
      user.picture = req.payload.picture
      user.name = req.payload.name
      user.admin = false

      User.create(user, (err, user) => {
        if (err) return res(Boom.badImplementation(err))

        res({ id_token: createToken(user) }).code(201)
      })
    },
    // Validate the payload against the Joi schema
    validate: {
      payload: createUserSchema
    }
  }
}
