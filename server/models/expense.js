module.exports = (sequelize, type) => {
  var Expense = sequelize.define('expense',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      amount: {
        type: type.INTEGER,
        allowNull: false
      },
      description: {
        type: type.STRING
      },
      dateTime: {
        type: type.DATE,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Expense.belongsTo(models.User)
          Expense.belongsTo(models.Category)
        }
      }
    }
  )
  return Expense
}
