'use strict'

Vue.component('filtered-barang', {
  props: ['filtered','minus','add','select','hapus'],
  template: `
  <table class="table table-hover">
    <thead>
      <tr>
        <th>No</th>
        <th>Nama Barang</th>
        <th>Kategori Barang</th>
        <th>Harga</th>
        <th>Stok</th>
        <th>Pilihan</th>
      </tr>
    </thead>
  <tbody>
  <tr v-for='(barang, index) in filtered' class="fade-in">
    <td>{{index+1}}</td>
    <td>{{barang.nama_barang}}</td>
    <td>{{barang.kategori}}</td>
    <td>{{barang.harga}}</td>
    <td><i class="glyphicon glyphicon-minus-sign" @click="minus(barang._id)"></i>
                  {{barang.stok}}
        <i class="glyphicon glyphicon-plus-sign" @click="add(barang._id)"></i></td>
    <td>
      <button type="button" name="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal2" @click="select(barang._id)"> <i class="glyphicon glyphicon-pencil" ></i></button>
      <button type="button" name="button" class="btn btn-danger"  @click="hapus(barang._id)"><i class="glyphicon glyphicon-trash"></i></button>
    </td>
  </tr>
  </tbody>
  </table>
  `
})

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    listBarang: [],
    nama_barang: '',
    kategori: '',
    harga: '',
    stok: '',
    gambar: '',
    _id: '',
    search: ''
  },
  methods:{
    addBarang:function(){
      const self = this
      axios.post('http://localhost:3000/barang',{
        nama_barang: self.nama_barang,
        kategori: self.kategori,
        harga: self.harga,
        stok: self.stok,
        gambar: self.gambar
      })
      .then(log=>{
        console.log(log.data);
        self.listBarang.push(log.data)
        self.nama_barang = ''
        self.kategori = ''
        self.harga = ''
        self.stok = ''
        self.barang = ''
      })
      .catch(err=>{
        console.log(err, 'ini error');
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
        stok: self.stok,
        gambar: self.gambar
      })
      .then(log=>{
        const newData = self.listBarang.map(function(barang){
          if(barang._id == self._id){
            barang.nama_barang = self.nama_barang
            barang.kategori = self.kategori
            barang.harga = self.harga
            barang.stok = self.stok
            barang.gambar = self.gambar
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
        self.gambar = row.data.gambar
      })
      .catch(err=>{
        console.log(err);
      })
    },
    logout: function(){
      alert('Anda Sudah Logout')
      localStorage.removeItem('token')
      window.location.href = 'index.html'
    }
  },
  computed:{
        filteredBarang:function()
        {
        	 var self=this;
           return this.listBarang.filter(function(cust)
           {
             return cust.nama_barang.toLowerCase().indexOf(self.search.toLowerCase())>=0;
           });
           //return this.customers;
        }
      },
  created: function(){
    const self = this
    axios.get('http://localhost:3000/barang',{
      headers:{
        token: localStorage.getItem('token')
      }
    })
    .then(result=>{
      self.listBarang = result.data
      console.log(result.data);
    })
    .catch(err=>{
      alert('Anda Blum Login')
      window.location.href = 'index.html'
    })
  }
})
