const express=require('express')
const mongoose=require('mongoose')
const bookRouter=express.Router()
const bookdata=require("../model/bookdata")
const {LocalStorage} = require("node-localstorage");
var localStorage = new LocalStorage('./scratch'); 


router=(nav)=>
{
    // var books=[
    //     {name:"book1",
    //     genre:"cartoon:",
    //     author:"joseph barbara",
    //     img:'tom.jpg'
    // },
    // {
    // name:"book2",
    //     genre:"cartoon:",
    //     author:"joseph",
    //     img:"harry.jpg"
    // },
    // {
    //     name:"book3",
    //         genre:"cartoon:",
    //         author:"joseph",
    //         img:"basheer.jpg"
    //     }
    // ]
 
    bookRouter.get('/',(req,res)=>
    {
        // bookdata.deleteMany({name:'Abel'}).then(
        // localStorage.setItem('Name', 'Manish Mandal') 
        
            
        // )
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
        // console.log(add)
     
       bookdata.find().sort({name:'asc'}).then((books)=>
        {
          
            res.render("books",
            {
                nav,books,
            title:"BOOKS",add:add,logged:logged})
        })
        })
      
    bookRouter.get("/:id",(req,res)=>
    {
        logged=localStorage.getItem('logged')

        if(logged=='false')
        {
            logged=false
        }
        else{
            logged=true
        }

        var id=req.params.id
          
        var add=localStorage.getItem('add')
        
        
        if(add=='false')
        {
            add=false
        }
        else{
            add=true
        }
bookdata.findOne({_id:id}).then((book)=>
        {
            //  console.log(book.id)
        res.render("book",
        {nav,book,logged:logged,title:"book",add:add})

        })
        
       
    })
    bookRouter.get("/d/:id",(req,res)=>
    {var id=req.params.id
    bookdata.findByIdAndDelete(id).then(()=>
        {

        })
        res.redirect('/books')
    })
    bookRouter.post("/e/:id",(req,res)=>
    {var id=req.params.id
        // console.log(req.body)
     var c={name:req.body.name,author:req.body.author,genre:req.body.genre,desc:req.body.desc}
    bookdata.findByIdAndUpdate({_id:id},c).then((bok)=>
        {
// console.log(bok)
res.redirect('/books')

        })
    })
    bookRouter.post("/comment/:id",async (req,res)=>
    {
        var id=req.params.id
        // console.log(id)

        const doc =await  bookdata.findOne({ _id: id })
        // var name=doc.name
var name=req.body.name
if(name=="")
{
    name='anonymous'
}
var comment=req.body.comment
var com=name+" : "+comment
        doc.comm.push(com)
        await doc.save()
       
res.redirect('/books/'+id)

    })
return bookRouter
}

module.exports=router