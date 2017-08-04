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
        if (log.data=="salah") {
          alert("Your Password Wrong")
          self.password = ''
        }else if (log.data =="notUser") {
          alert("Your don't have any access")
          self.username = ''
          self.password = ''
        }else {
          const tokenJwt = log.data;
          localStorage.setItem('token', tokenJwt)
          window.location.href = 'menu_admin.html'
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
})
