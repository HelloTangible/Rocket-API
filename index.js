const Hapi = require('hapi')
const Path = require('path')
const Boom = require('boom')
const Glob = require('glob')

const Globals = require('./config/globals')
const Db = require('./data/db')

var routes = require('./config/routes')
var goodConfig = require('./config/good-config.js')

const server = new Hapi.Server()

server.connection({ port: process.env.PORT || 3001 })

server.register([require('hapi-auth-jwt'), {
  register: require('good'),
  options: goodConfig
}], (err) => {

  if (err) {
    throw err
  }

  server.auth.strategy('jwt', 'jwt', {
    key: Globals.auth0Secret,
    verifyOptions: {
      algorithms: [ 'HS256' ]
    }
  });

  Glob.sync('api/**/routes/*.js', {
    root: __dirname
  }).forEach(file => {
    const route = require(Path.join(__dirname, file))
    server.route(route)
  })

  server.start((err) => {
    if (err) {
      throw err
    }

    console.log('Server running at:', server.info.uri)

    Db.connect()
  })
})
