module.exports = (sequelize, type) => {
  var Category = sequelize.define('category',
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
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Category.hasMany(models.Expense)
        }
      }
    }
  )
  return Category
}
