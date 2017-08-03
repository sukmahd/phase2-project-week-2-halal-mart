var mongoose = require('mongoose')
var Schema = mongoose.Schema

var transaksiSchema = new mongoose.Schema({
  tanggal : {
    type : Date,
    required :true
  },
  listBarang : {
    type : [{type:Schema.Types.ObjectId, ref: 'Barang'}],
    required :true
  },
  total : {
    type : Number,
    required :true
  }
})

var Transaksi = mongoose.model('Transaksi',transaksiSchema)

module.exports = Transaksi;
