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
    type : String,
    required :true
  },
  stok : {
    type : String,
    required :true
  }
})

var Barang = mongoose.model('Barang',barangSchema)

module.exports = Barang;
