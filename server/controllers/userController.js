const UM = require('../models').User;
const bcrypt = require('bcrypt');
const generateToken = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');
const dotenv = require('dotenv').config();

class UserController {
  static register(req, res, next) {
    const {email, password} = req.body;
    console.log(email);
    console.log(password);
    UM.create({email,password})
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static login(req, res, next) {
    const {email, password} = req.body;
    UM.findOne({where:{email}})
    .then(user => {
      if(!user || !bcrypt.compareSync(password, user.password)){
        next({name: 'UNAUTHORIZED'})
      }

      return user;
    })
    .then(user => {
      const accessToken = generateToken(user)
      res.status(200).json({accessToken})
    })
    .catch(err => {
      next(err)
    })
  }

  static googleLogin(req, res, next) {
    const token = req.body.token_id;
    const client = new OAuth2Client(process.env.client_id);
    let email;

    client.verifyIdToken({
      idToken: token,
      audience: process.env.client_id
    })
    .then( ticket => {
      const payload = ticket.getPayload();
      email = payload['email'];
      return UM.findOne({where:{email:email}})
    })
    .then(data => {
      if(data) return data;
      else return UM.creat({email, password:'password'})
    })
    .then(data => {
      const accessToken = generateToken(data)
      res.status(200).json({accessToken})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController;
