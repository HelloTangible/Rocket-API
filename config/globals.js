module.exports = {
  dbUri: process.env.MONGO_URL || 'test',
  auth0Key: process.env.AUTH0_CLIENT_ID || '1234',
  auth0Secret: process.env.AUTH0_CLIENT_SECRET || '1234'
}
