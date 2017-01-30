let bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10);

exports.password = {
    cryptIt() {

      let newPassword = bcrypt.hashSync(req.body.password, salt)
      req.body.password = newPassword


    }
}
