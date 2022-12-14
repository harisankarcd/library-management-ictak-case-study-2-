const express=require('express')
const bookdata=require("../model/bookdata")
const multer=require('multer')
const addbookRouter=express.Router()
const {LocalStorage} = require("node-localstorage");
var localStorage = new LocalStorage('./scratch'); 

const fileStorageEngine=multer.diskStorage(
    {
        destination:(req,file,cb)=>
        {
             cb(null,'C:/Users/haris/Desktop/lib2/src/views/images/')
        },
        filename:(req,file,cb)=>
        {
            cb(null,file.originalname)
        }
    }
)
const upload=multer({storage:fileStorageEngine})
addbkRouter=(nav)=>
{
    addbookRouter.get("/",(req,res)=>
    {
        logged=localStorage.getItem('logged')

        if(logged=='false')
        {
            logged=false
        }
        else{
            logged=true
        }
        
        var add=localStorage.getItem('add')
        
        
        if(add=='false')
        {
            add=false
        }
        else{
            add=true
        }
        res.render("addbook",{title:"add books",nav,add:add,logged:logged})
    })
    addbookRouter.post("/add",upload.single('image'),(req,res)=>
    {
        // console.log(req.body)
        var it={
            name:req.body.name,
            author:req.body.author,
            img:req.body.image,
            desc:req.body.desc,
            genre:req.body.genre

        }

       var book=bookdata(it)//
    // console.log(it)
       book.save()
  
    res.redirect('/books')
    })
  
    return addbookRouter
}
module.exports=addbkRouter