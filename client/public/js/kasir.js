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
    cart: [],
    search: ''
  },
  computed:{
    total(){
      let total = 0
      for(let i = 0; i < this.cart.length; i++){
        total+= (this.cart[i].harga * this.cart[i].quantity)
      }
      return total
    },
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

      const dataBaru = this.listBarang.map(function(item){
        if(barang._id == item._id){
          item.stok -= 1
          return item
        }else {
          return item
        }
      })

      this.listBarang = dataBaru
    },
    removeFromCart:function(barang, index){
      const dataBaru = this.listBarang.map(function(item){
        console.log(barang._id);
        console.log(item._id);
        if(barang._id == item._id){
          item.stok += barang.quantity
          return item
        }else {
          return item
        }
      })

      this.cart.splice(index, 1)
        this.listBarang = dataBaru
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
