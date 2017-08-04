var mongoose = require('mongoose')
var Schema = mongoose.Schema

var transaksiSchema = new mongoose.Schema({
  tanggal : {
    type : Date,
    required :true
  },
  listBarang : {
    type : [{
        idBarang:{type:Schema.Types.ObjectId, ref: 'Barang'},
        quantity: {type: Number, required:true}
    }],
    required :true
  },
  total : {
    type : Number,
    required :true
  }
})

var Transaksi = mongoose.model('Transaksi',transaksiSchema)

module.exports = Transaksi;
