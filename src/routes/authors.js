const express=require('express')
const authordata=require('../model/authorModel')
const addAuthorRouter=express.Router()
const {LocalStorage} = require("node-localstorage");
var localStorage = new LocalStorage('./scratch'); 
const bookdata=require("../model/bookdata")

 


authorRouter=(nav)=>
{
   addAuthorRouter.get("/",(req,res)=>
   {
    
//   authordata.deleteMany({name:'nanda'}).then(()=>
//   {
//     console.log('yes')
//   })
   authordata.find().sort({name:'asc'}).then((books)=>
    {
        var add=localStorage.getItem('add')
        
        // add=Boolean(add)
        if(add=='false')
        {
            add=false
        }
        else{
            add=true
        }
        // console.log(add)
        var add=localStorage.getItem('add')
        
        
        if(add=='false')
        {
            add=false
        }
        else{
            add=true
        }

        res.render("authors",
        {
            nav,books,
        title:"AUTHORS",add:add,logged:logged})
    })
   })
    addAuthorRouter.post("/add",(req,res)=>
    {
        adj=['young','talented','Energetic','compelling','Hardworking','Fun loving']
        var about=req.body.about
        if(about=='')
        {var x=adj[Math.floor(Math.random()*adj.length)]
         var y=adj[Math.floor(Math.random()*adj.length)]
if(x==y)
{
    y='aspiring'
}
            about=x+" "+y +" Writer"
        }
        var it={name:req.body.name,
        authorWorks:req.body.authorWorks
    ,about:about}
    authordata(it).save()
    res.redirect('/authors')
  
  
    })
    addAuthorRouter.get("/:id",(req,res)=>
    {
        var id=req.params.id
        authordata.findByIdAndDelete(id).then(()=>
        {
            // console.log("yes")
        })
        res.redirect('/authors')
    
    
    }
    )
    return addAuthorRouter
}
module.exports=authorRouter