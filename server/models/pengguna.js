var mongoose = require('mongoose')

var penggunaSchema = new mongoose.Schema({
  nama : {
    type : String,
    required :true
  },
  username : {
    type : String,
    required :true
  },
  password: {
    type : String,
    required :true
  },
  peran: {
    type : String,
    required :true
  },
  key :{
    type :String,
    required : true
  }
})

var Pengguna = mongoose.model('Pengguna',penggunaSchema)

module.exports = Pengguna;
