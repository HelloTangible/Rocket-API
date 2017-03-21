const User = require('../model/User')
const Boom = require('boom')

module.exports = {
  method: 'GET',
  path: '/api/users/{id}',
  config: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    },
    handler: (req, res) => {
      User
        .find({ user_id: req.params.id })
        .select('-__v')
        .exec((err, users) => {
          if (err) {
            throw Boom.badRequest(err)
          }
          if (!users.length) {
            throw Boom.notFound('No users found!')
          }
          res(users)
        })
    }
    // Add authentication to this route
    // The user must have a scope of `admin`
    /* auth: {
      strategy: 'jwt',
      scope: ['admin']
    } */
  }
}
