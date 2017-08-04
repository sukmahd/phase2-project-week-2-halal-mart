const app = new Vue({
  el:'#app',
  msg: 'Hallo vue',
  data: {
    listBarang: [],
    nama_barang: '',
    kategori: [],
    harga: '',
    stok: '',
    gambar: '',
    _id: ''
  },
  created: function(){
    const self = this
    axios.get('http://localhost:3000/barang')
    .then(result=>{
      self.listBarang = result.data;
      for(let i = 0 ; i < self.listBarang.length ; i++){
      self.kategori.push(self.listBarang[i].kategori);
      }
      self.kategori = self.kategori.filter((x, i, a) => a.indexOf(x) == i)
      console.log(self.listBarang.gambar);
    })
    .catch(err=>{
      console.log(err);
    })
  }
})
