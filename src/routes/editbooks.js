const express=require('express')
const bookdata=require("../model/bookdata")
const multer=require('multer')
const editbookRouter=express.Router()

// const upload=multer({storage:fileStorageEngine})
editbkRouter=(nav)=>
{
    editbookRouter.get("/",(req,res)=>
    {
        res.render("editbook",{title:"books",nav,})
    })
   
    return editbookRouter
}
module.exports=editbkRouter