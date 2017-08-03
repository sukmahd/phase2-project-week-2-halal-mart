'use strict'

const Barang = require('../model/Barang');

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
    category: req.body.category
  })
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    res.send(err)
  })
}

function deleteBarang(req,res){
  Barang.delete({
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
    
  })
}


module.exports = {
  getByCategory,
  getAllBarang,
  getOneBarang,
  addBarang,
  deleteBarang,
  editBarang
};
