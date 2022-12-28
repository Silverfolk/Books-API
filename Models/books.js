const mongoose=require('mongoose');
const validator=require('validator');
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
        minlength:1
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Author',
        
    },
    likes:{
        type:Number,
        default:0,
        required:true
    },
   
});

const Book=new mongoose.model('Book',bookSchema);
module.exports=Book;