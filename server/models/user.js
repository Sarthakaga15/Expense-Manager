const bcrypt = require('bcryptjs')
module.exports = (sequelize, type) => {
  var User = sequelize.define('user',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      name: {
        type: type.STRING,
        allowNull: false
      },
      userName: {
        type: type.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: type.STRING,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          User.hasMany(models.Expense)
        }
      }
    }
  )
  User.generateHash = function (password) {
    return bcrypt.hashSync(password, 10)
  }
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }
  return User
}
