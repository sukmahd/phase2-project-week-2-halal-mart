var mongoose = require('mongoose')

var transaksiSchema = new mongoose.Schema({
  tanggal : {
    type : Date,
    required :true
  },
  listBarang : {
    type : Array,
    required :true
  },
  total : {
    type : String,
    required :true
  }
})

var Transaksi = mongoose.model('Transaksi',transaksiSchema)

module.exports = Transaksi;
