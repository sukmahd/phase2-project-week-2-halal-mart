'use strict'

const Transaksi = require('../models/transaksi')

function createTransaksi(req,res){
  Transaksi.create({
    tanggal: new Date(),
    listBarang: req.body.listBarang,
    total: req.body.total
  })
  .then(log=>{
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
