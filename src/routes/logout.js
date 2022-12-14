const express=require('express')
const logOutRouter=express.Router()
const {LocalStorage} = require("node-localstorage");
var localStorage = new LocalStorage('./scratch'); 
var add=localStorage.getItem('add')

lr=(nav)=>
{
    logOutRouter.get('/',(req,res)=>
    {
        // res.send('hai')
        localStorage.setItem('add',false)
        localStorage.setItem('logged',false)
        res.redirect('/')
    })
    return logOutRouter
}
module.exports=lr