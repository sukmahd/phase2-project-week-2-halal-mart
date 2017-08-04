'use strict'

const app = new Vue({
  el: '#app',
  data:{
    msg: 'hai',
    username:'',
    password:''
  }
  ,
  methods:{
    login:function(){
      const self = this
      axios.post('http://localhost:3000/users/signin',{
        username: self.username,
        password: self.password
      })
      .then(log=>{
        const tokenJwt = log.data;
        console.log(tokenJwt);
        localStorage.setItem('token', tokenJwt)
        window.location.href = 'menu_admin.html'
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
})
