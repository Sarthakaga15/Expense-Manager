const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const ExpenseModel = require('./models/expense')
const CategoryModel = require('./models/category')
const { Categories } = require('./constants')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: process.env.NODE_ENV === 'production' ? '' : console.log,
  }
)

var db = {}
db.User = UserModel(sequelize, Sequelize)
db.Expense = ExpenseModel(sequelize, Sequelize)
db.Category = CategoryModel(sequelize, Sequelize)

Object.keys(db).forEach(function (modelName) {
  if ('classMethods' in db[modelName].options) {
    if ('associate' in db[modelName].options['classMethods']) {
      db[modelName].options.classMethods.associate(db)
    }
  }
})

sequelize
  .sync({ force: false, alter: false })
  .then(async () => {
    console.log('Database & tables created!')
    Object.keys(Categories).forEach(async (key) => {
      await db.Category.findOrCreate({
        where: { id: Categories[key].id, name: Categories[key].name }
      }).catch(err => console.log(err))
    })  
  })
  
module.exports.db = db
module.exports.sequelize = sequelize
  
