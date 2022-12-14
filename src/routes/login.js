const express=require('express')
const userData=require("../model/users")
const loginRouter=express.Router()
const {LocalStorage} = require("node-localstorage");
var localStorage = new LocalStorage('./scratch'); 
var add=localStorage.getItem('add')
loginRout=(nav)=>
{
    loginRouter.get('/',(req,res)=>{
      var add=localStorage.getItem('add')
        
        
      if(add=='false')
      {
          add=false
      }
      else{
          add=true
      }
      // console.log(add)
      // console.log(localStorage.getItem('add'))  
      res.render("login",
        {
            nav,
            title:'Login',
            add:add
        }
        
        );
    });


    loginRouter.post('/post',async(req,res)=>
    {
   
       var email=req.body.email 
       var password=req.body.password
      await userData.find({"email":email}).then((result)=>
      {
      if((result[0].password===password))
      {
      admin=result[0].add
     localStorage.setItem('logged',true)


      localStorage.setItem('add',admin)
      
      // console.log(localStorage.getItem('add'))
      // console.log("admin",admn)
     
      
        res.redirect("/")
      
      }
      else{
        res.send("incorrect password")
      }

      })
  
    })
    return loginRouter
}
module.exports=loginRout