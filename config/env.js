module.exports = {
    "development": {
        db: process.env.MONGODB_URI || require('./dev').db,
        token : process.env.SECRET_TOKEN || 'secretToken'
      },
  "production": {
      db: process.env.MONGODB_URI ||  require('./dev').db,
      token : process.env.SECRET_TOKEN || "secretToken"
    }
  }
