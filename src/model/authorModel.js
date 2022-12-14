const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const authorSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    authorWorks:{
        type:String,
        required:true
    },
    
    about:{
        type:String,
        // required:true
    },
});

const authorModel=mongoose.model('author',authorSchema);

module.exports=authorModel;