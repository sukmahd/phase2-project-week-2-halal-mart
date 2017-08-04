var jwt = require('jsonwebtoken');
require('dotenv').config();
const pengguna  = require("../models/pengguna")
const encryptPassword = require("../helper/encryptPassword")

function signin(req,res){
  console.log(req.body.username);
  console.log(req.body.password);
  pengguna.find({username: req.body.username}).
  then(data=>{
    if (data[0].password == encryptPassword(req.body.password,data[0].key)) {
      console.log("masuk");
      var token = jwt.sign({
        _id :data[0]._id,
        username : data[0].username,
        role : data[0].peran
      },process.env.SECRET_KEY);
      console.log(token);
      res.send(token)
    }
  })
}

module.exports ={signin} ;
