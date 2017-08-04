'use strict'

const Transaksi = require('../models/transaksi')
const Barang = require('../models/barang')

function createTransaksi(req,res){
  Transaksi.create({
    tanggal: new Date(),
    listBarang: req.body.listBarang,
    total: req.body.total
  })
  .then(log=>{
    for (var i = 0; i < req.body.listBarang.length; i++) {
      let data = req.body.listBarang[i];
      Barang.findById(req.body.listBarang[i].idBarang)
      .then(row=>{
        console.log(row, 'ini row');
        console.log(data);
        Barang.findOneAndUpdate({
          _id: row._id
        },{
          stok: row.stok - data.quantity
        })
        .then(log=>{
          console.log(log);
        })
        .catch(err=>{
          console.log(err);
        })
      })
      .catch(err=>{
        console.log(err);
      })
      console.log('asdsd');
    }
    res.send(log)
  })
  .catch(err=>{
    res.send(err)
  })
}

function getAllTransaksi(req,res){
  Transaksi.find()
  .populate('idBarang')
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    res.send(err)
  })
}

function getOneTransaksi(req,res){
  Transaksi.findById(req.params.id)
  .then(row=>{
    res.send(row)
  })
  .catch(err=>{
    res.send(err)
  })
}


function pushBarangToTransaksi(req,res){
  Transaksi.where({
    _id:req.params.id
  })
  .update({
    $push:{
      listBarang:req.body.barang
    }
  })
  .then(log=>{
    res.send(log)
  })
  .catch(err=>{
    res.send(err)
  })
}

module.exports = {
  createTransaksi,
  getAllTransaksi,
  pushBarangToTransaksi,
  getOneTransaksi
};
