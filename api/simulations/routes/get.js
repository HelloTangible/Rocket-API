const Simulation = require('../model/Simulation')
const Boom = require('boom')

module.exports = {
  method: 'GET',
  path: '/api/simulations',
  config: {
    handler: (req, res) => {
      Simulation
        .find()
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, users) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!users.length) {
            throw Boom.notFound('No simulations found!');
          }
          res(users);
        })
    },
    // Add authentication to this route
    // The user must have a scope of `admin`
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
}