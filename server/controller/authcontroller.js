const db = require('../sequelize').db
const passport = require('./passportAuth').passport
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log(err)
    if (err || !user) {
      return res.status(400).json({ message: info.message })
    }
    req.login(user, { session: false }, err => {
      console.log("Passport login done")
      if (err) {
        console.log(err)
        res.status(400).send({ err });
      }
      var payload = { id: user.id, userName: user.userName }
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      var cookiePayload = { user, token }
      console.log(cookiePayload)
      return res.json({ user, token });
    })
  })(req, res, next)
}

exports.signup = async (req, res) => {
  try{
    let { name, userName, password } = req.body
    let isValid = validateBody(name, userName, password)
    if(!isValid)
      throw new Error('Invalid Request')
    let passwordHash = db.User.generateHash(password)
    let user = { 
      name: name,
      userName: userName,
      password: passwordHash
    }
    let [ insertedUser, isCreated ] = await db.User.findOrCreate({
      where: { userName: userName },
      defaults: user
    })
    if(!isCreated){
      throw new Error('User already exists, please login')
    }
    return res.status(200).json({ message: 'User successfully registered'})
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}

const validateBody = (name, userName, password) => {
  return name && name !== '' && userName && userName !== '' && password && password !== ''
}
