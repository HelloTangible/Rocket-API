const jwt = require('jsonwebtoken')
const Globals = require('../../../config/globals')

function createToken(user) {
  let scopes;
  // Check if the user object passed in
  // has admin set to true, and if so, set
  // scopes to admin
  if (user.admin) {
    scopes = 'admin';
  }
  // Sign the JWT
  return jwt.sign({ id: user._id, username: user.username, scope: scopes }, Globals.auth0Secret, { algorithm: 'HS256', expiresIn: "1h" } );
}

module.exports = createToken
