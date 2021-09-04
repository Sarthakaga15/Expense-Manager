import axios from 'axios'
import app from '@/main'


const client = axios.create({
  baseURL: '/',
  json: true
})

// Start the progress bar when request starts
client.interceptors.request.use(config => {
  app.$Progress.start() // for every request start the progress
  return config
})

// Add axios interceptors to route to home page on token expiry
client.interceptors.response.use(function (response) {
  console.log('axios response came back')
  // Finish progress bar
  app.$Progress.finish()
  return response
}, function (error) {
  app.$Progress.fail()
  console.log('error in response')
  if (error.response && error.response.status === 401) {
    localStorage.clear()
    window.location = '/'
  } else {
    return Promise.reject(error)
  }
})

export default {
  async execute (method, path, data, params) {
    let accessToken = localStorage.getItem('token')
    return client({
      method,
      url: path,
      data: data,
      params: params,
      baseURL: 'http://localhost:3000/',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(res => {
      return res.data
    })
  },
  login(user){
    return this.execute('post', 'api/login', user)
  },
  signup(user){
    return this.execute('post', 'api/signup', user)
  },
  createExpense(expense){
    return this.execute('post', 'api/expense', expense)
  },
  getExpenses({ limit, offset }){
    return this.execute('get', 'api/expenses', null, { limit: limit, offset: offset })
  },
  deleteExpense(expenseId){
    return this.execute('delete', `api/expense/${expenseId}`)
  },
  updateExpense(expenseId, expense){
    return this.execute('put', `api/expense/${expenseId}`, expense)
  },
  getUserDashboard(){
    return this.execute('get', 'api/dashboard')
  },
  getUserReport({ month }){
    return this.execute('get', 'api/report', null, { month: month })
  }
}
