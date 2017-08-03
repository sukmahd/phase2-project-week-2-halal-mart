'use strict'

const Barang = require('../models/barang');

function getAllBarang(req,res) {
  Barang.find()
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    res.send(err)
  })
}

function getOneBarang(req,res){
  Barang.findById(req.params.id)
  .then(row=>{
    res.send(row)
  })
  .catch(err=>{
    res.send(err)
  })
}

function getByCategory(req,res){
  Barang.find({
    kategori: req.params.kategori
  })
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    res.send(err)
  })
}

function deleteBarang(req,res){
  Barang.deleteOne({
    _id: req.params.id
  })
  .then(log=>{
    res.send(log)
  })
  .catch(err=>{
    res.send(err)
  })
}

function editBarang(req,res){
  Barang.findOneAndUpdate({
    _id:req.params.id
  },{
    nama_barang: req.body.nama_barang,
    kategori: req.body.kategori,
    harga: req.body.harga,
    stok: req.body.stok
  })
  .then(log=>{
    res.send(log)
  })
  .catch(err=>{
    res.send(err)
  })
}

function addBarang(req,res){
  Barang.create({
    nama_barang: req.body.nama_barang,
    kategori: req.body.kategori,
    harga: req.body.harga,
    stok: req.body.stok
  })
  .then(log=>{
    res.send(log)
  })
  .catch(err=>{
    res.send(err)
  })
}

function editStok(req,res){
  Barang.where({
    _id: req.params.id
  })
  .update({
    stok: req.body.stok
  })
  .then(log=>{
    res.send(log)
  })
  .catch(err=>{
    res.send(err)
  })
}



module.exports = {
  getByCategory,
  getAllBarang,
  getOneBarang,
  addBarang,
  deleteBarang,
  editBarang,
  editStok
};
