const express = require('express')
const cors = require('cors')
const passportAuth = require('./controller/passportAuth')
require('./sequelize.js')

var app = express()
app.use(cors())
app.use(express.json())

passportAuth.initPassport(app)
require('./routes/index')(app)

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port: ' + process.env.PORT);
})
