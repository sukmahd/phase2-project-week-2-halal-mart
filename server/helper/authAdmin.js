"use-strict"

var jwt =require('jsonwebtoken');
require('dotenv').config();

function authAdmin(req,res,next) {
    var token = req.headers.token
    if (token) {
      jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=> {
        if (decoded.peran == 'admin') {
          return next()
        }else {
          res.send('not authorized')
        }
      })
    }
    else {
      res.send("404 Not Found")
    }

 }

module.exports ={authAdmin} ;
