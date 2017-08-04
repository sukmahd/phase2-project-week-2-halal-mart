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
    _id: '',
    cart: []
  },
  computed:{
    total(){
      let total = 0
      for(let i = 0; i < this.cart.length; i++){
        total+= (this.cart[i].harga * this.cart[i].quantity)
      }
      return total
    }
  },
  methods:{
    addToCart:function(barang){
      const pos = this.cart.indexOf(barang)
      if(pos >= 0){
        const newData = this.cart.filter(function(item){
            if(item._id == barang._id){
              item.quantity += 1
              return item
            }else {
              return item
            }
        })
        this.cart = newData
      }else {
        barang.quantity = 1;
        this.cart.push(barang)
      }
    },
    removeFromCart:function(barang){
      this.cart.splice(this.cart.indexOf(barang), 1)
    },
    checkoutBarang:function(){
      const self = this
      let array = []
      for (var i = 0; i < this.cart.length; i++) {
        let obj = {}
        obj.idBarang = this.cart[i]._id
        obj.quantity = this.cart[i].quantity
        array.push(obj)
      }

      console.log(array);
      axios.post('http://localhost:3000/transaksi',{
        listBarang: array,
        total: self.total
      })
      .then(log=>{
        console.log(log);
      })
      .catch(err=>{
        console.log(err);
      })
    },
    reset: function(){
      this.cart = []
    },
    logout: function(){
      alert('Anda Sudah Logout')
      localStorage.removeItem('token')
      window.location.href = 'index.html'
    }
  },
  created: function(){
    const self = this
    axios.get('http://localhost:3000/barang', {
      headers:{
        token: localStorage.getItem('token')
      }
    })
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
