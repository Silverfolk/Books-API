const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const authorSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minlength:2
    },
    password:{
        type:String,
        require:true,
        allowNull:false
    },
    email:{
        type:String,
        require:true,
        unique:[true,"Email is already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    phone:{
        type:Number,
        min:10,
        unique:true,
        required:true
    },
    BooksLiked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
    ],
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
   
});

const Author=new mongoose.model('Author',authorSchema);
module.exports=Author;