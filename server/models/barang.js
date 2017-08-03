var mongoose = require('mongoose')

var barangSchema = new mongoose.Schema({
  nama_barang : {
    type : String,
    required :true
  },
  kategori: {
    type : String,
    required :true
  },
  harga: {
    type : Number,
    required :true
  },
  stok : {
    type : Number,
    required :true
  }
})

var Barang = mongoose.model('Barang',barangSchema)

module.exports = Barang;
