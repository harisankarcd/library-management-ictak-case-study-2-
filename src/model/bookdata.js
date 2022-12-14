const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://harisankar:rajesh@cluster0.ol4hwbt.mongodb.net/booksdb?retryWrites=true&w=majority")

var bookmodel=mongoose.model(
    "book" ,
    new mongoose.Schema(
        {   name:String,
            genre:String,
            author:String,
            img:String,
            desc:String,
            comm:[String]


            
        }

    )
)
module.exports=bookmodel