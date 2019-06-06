import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import database from '../data/db';

//this is used to inject the DB for testing
var db = database;
function initDB(_db){
  db = _db
}

var session = {loggedUsers : []}

function login(req, res){
  if (!req.body.username || !req.body.password){
    return res.status(403).send({
      success: 'false',
      message: 'Missing username or password'
    });
  }
  var token;

  db.users.forEach(function(user){
    if (user.username == req.body.username){
      if(bcrypt.compareSync(req.body.password, user.password)) {
          token = jwt.sign(
          {id: user.username},
          req.app.get('secretKey'),
          {expiresIn: '1h'});
          session.loggedUsers[req.body.username] = token;
          return res.status(200).send({
            success: 'true',
            message: 'User loged in successfully',
            data: {user: user.username, token: token}
          });
      }
    }
  });
  if (!token){
    res.status(403).send({
      success: 'false',
      message: 'User not authorized or credentials are invalid'
    });
  }
}

function validate(req, res, next) {
  if (!req.headers['username'] ||
      session.loggedUsers[req.headers['username']] != req.headers['x-access-token']){
    return res.status(403).send({
      success: 'false',
      message: 'User not authorized or credentials are invalid'
    });
  }
  jwt.verify(
    req.headers['x-access-token'],
    req.app.get('secretKey'),
    function(err, decoded) {
      if (err) {
        return res.status(403).send({
          success: 'false',
          message: err.message
        });
      }else{
        req.body.username = decoded.id;
        next();
      }
  });
}

module.exports = {login, validate, initDB};
