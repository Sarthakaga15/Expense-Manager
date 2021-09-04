const authController = require('../controller/authcontroller')
const expenseController = require('../controller/expensecontroller')
const passport = require('passport')

module.exports = function (app) {
  
  app.post('/api/login', 
    authController.login
  )
  
  app.post('/api/signup',
    authController.signup
  )
  
  app.post('/api/expense',
    passport.authenticate("jwt", { session: false }),
    expenseController.createExpense
  )
  
  app.get('/api/expenses',
    passport.authenticate("jwt", { session: false }),
    expenseController.getExpenses
  )
  
  app.put('/api/expense/:expenseId',
    passport.authenticate("jwt", { session: false }),
    expenseController.updateExpense
  )
  
  app.delete('/api/expense/:expenseId',
    passport.authenticate("jwt", { session: false }),
    expenseController.deleteExpense
  )
    
  app.get('/api/dashboard',
    passport.authenticate("jwt", { session: false }),
    expenseController.getUserDashboard
  )
  
  app.get('/api/report',
    passport.authenticate("jwt", { session: false }),
    expenseController.getUserReport
  )
}
