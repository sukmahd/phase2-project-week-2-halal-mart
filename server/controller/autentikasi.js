var jwt = require('jsonwebtoken');
require('dotenv').config();
const pengguna  = require("../models/pengguna")
const encryptPassword = require("../helper/encryptPassword")

function signin(req,res){
  pengguna.find({username: req.body.username}).
  then(data=>{
    if (data[0].password == encryptPassword(req.body.password,data[0].key)) {
      var token = jwt.sign({
        _id :data[0]._id,
        username : data[0].username,
        role : data[0].peran
      },process.env.SECRET_KEY);
      res.send(token)
    }else {
      res.send("salah")
    }
  }).catch(err=>{res.send("notUser")})
}

module.exports ={signin} ;
