let bcrypt = require('bcrypt')
const ENV = require('../../config/env')
exports.password = {

    cryptIt(password) {
        let newPassword = bcrypt.hashSync(password, ENV.salt)
        return newPassword;

    }
}
