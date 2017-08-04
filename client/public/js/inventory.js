'use strict'

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    listBarang: [],
    nama_barang: '',
    kategori: '',
    harga: '',
    stok: '',
    _id: ''
  },
  methods:{
    addBarang:function(){
      const self = this
      axios.post('http://localhost:3000/barang',{
        nama_barang: self.nama_barang,
        kategori: self.kategori,
        harga: self.harga,
        stok: self.stok
      })
      .then(log=>{
        console.log(log.data);
        self.listBarang.push(log.data)
        self.nama_barang = ''
        self.kategori = ''
        self.harga = ''
        self.stok = ''
      })
      .catch(err=>{
        console.log(err);
      })
    },
    deleteBarang: function(id){
      const self = this
      axios.delete(`http://localhost:3000/barang/${id}`)
      .then(log=>{
        const newData = self.listBarang.filter(function(barang){
          return barang._id != id
        })

        self.listBarang = newData
        console.log(log);
      })
      .catch(err=>{
        console.log(err);
      })
    },
    addStok: function(id){
      const self = this
      const index = self.listBarang.findIndex(function(barang){
        return barang._id == id
      })
      const stok = self.listBarang[index].stok+=1
      axios.put(`http://localhost:3000/barang/stok/${id}`,{
        stok: stok
      })
      .then(log=>{
        console.log(log);
      })
      .catch(err=>{
        console.log(err);
      })
    },
    minusStok: function(id){
      const self = this
      const index = self.listBarang.findIndex(function(barang){
        return barang._id == id
      })
      const stok = self.listBarang[index].stok-=1
      axios.put(`http://localhost:3000/barang/stok/${id}`,{
        stok: stok
      })
      .then(log=>{
        console.log(log);
      })
      .catch(err=>{
        console.log(err);
      })
    },
    editBarang: function(id){
      const self = this
      axios.put(`http://localhost:3000/barang/${id}`,{
        nama_barang: self.nama_barang,
        kategori: self.kategori,
        harga: self.harga,
        stok: self.stok
      })
      .then(log=>{
        const newData = self.listBarang.map(function(barang){
          if(barang._id == self._id){
            barang.nama_barang = self.nama_barang
            barang.kategori = self.kategori
            barang.harga = self.harga
            barang.stok = self.stok
            return barang
          }else {
            return barang
          }
        })
        self.listBarang = newData
        console.log(log);
      })
      .catch(err=>{
        console.log(err);
      })
    },
    selectBarang: function(id){
      const self = this
      axios.get(`http://localhost:3000/barang/${id}`)
      .then(row=>{
        self._id = row.data._id
        self.nama_barang = row.data.nama_barang
        self.kategori = row.data.kategori
        self.harga = row.data.harga
        self.stok = row.data.stok
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },
  created: function(){
    const self = this
    axios.get('http://localhost:3000/barang')
    .then(result=>{
      self.listBarang = result.data
    })
    .catch(err=>{
      console.log(err);
    })
  }
})