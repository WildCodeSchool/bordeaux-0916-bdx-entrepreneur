module.exports = {
    db: process.env.MONGODB_URI ||'mongodb://localhost:27017/entrepreneur',
    token: process.env.SECRET_TOKEN || 'secretToken'
}
