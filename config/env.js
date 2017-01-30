module.exports = {
    db: process.env.MONGODB_URI ||'mongodb://localhost:27017/entrepreneur',
    token: process.env.SECRET_TOKEN || 'secretToken',
    salt: process.env.PASSWORD || '$2a$10$ao.rMEHlDA.M0oehvBWZEKXtDqrbahWTKeq',
    mail: process.env.SENDGRID_API_KEY
}
