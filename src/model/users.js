const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://harisankar:rajesh@cluster0.ol4hwbt.mongodb.net/booksdb?retryWrites=true&w=majority")

var userData=new mongoose.model('users',new mongoose.Schema(
    {
        email:String,
        password:String,
        add:Boolean
    }
))
module.exports=userData