const express=require('express')
const userData=require("../model/users")
const signUpRouter=express.Router()
const {LocalStorage} = require("node-localstorage");
var localStorage = new LocalStorage('./scratch'); 
var add=localStorage.getItem('add')
signUpRout=(nav)=>
{
    signUpRouter.get('/',(req,res)=>{

        var add=localStorage.getItem('add')
        
        
        if(add=='false')
        {
            add=false
        }
        else{
            add=true
        }
        // console.log(add)
        res.render("signup",
        {
            nav,
            title:'signUp',add:add
        }
        );
    });


    signUpRouter.post('/post',(req,res)=>
    {
       
        var data=
        {
       email:req.body.email ,
       password:req.body.password,
       add:false
        }
        var datatosend=userData(data)
        datatosend.save()
        localStorage.setItem('add',false)
        localStorage.setItem('logged',true)
      
   res.redirect('/') 

    })
    return signUpRouter
}
module.exports=signUpRout
