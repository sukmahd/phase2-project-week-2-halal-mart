const pengguna  = require("../models/pengguna")
const makeKey     = require("../helper/key")
const encryptPassword = require("../helper/encryptPassword")

function getPengguna(req,res) {
  pengguna.find({},(err ,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.status(500).send(err)
    }
  })
}

function insertPengguna(req,res){
  var newKey = makeKey()
  console.log(req.body.password);
  var makePassword = encryptPassword(req.body.password,newKey)
  var newPengguna = new pengguna({
    nama : req.body.nama,
    username : req.body.username,
    peran: req.body.peran,
    password : makePassword,
    key : newKey
  })

  newPengguna.save((err,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.status(500).send(err)
    }
  })
}

module.exports = {getPengguna ,insertPengguna};
