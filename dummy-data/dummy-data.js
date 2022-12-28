const { faker } = require("@faker-js/faker");

const Author=require('../Models/authors');
const Book=require('../Models/books');
const bcrypt=require('bcrypt');

async function GenerateData(){
 try{
       
    for(let i=0;i<5;i++){
             
        const name=faker.name.fullName();
        const password='12345';
        const email=faker.internet.email();
        const phone=faker.phone.number("9#########");
        bcrypt.hash(password,10,async (err,hash)=>{
            if(err){
                return res.status(500).json({
                  message:"Something is wrong with Bycrpt",
                    error:err
                })
             }
             else{
                const author=new Author({
                    name:name,
                    password:hash,
                    email:email,
                    phone:phone,
                })
            
                const booknum=Math.floor(Math.random() * 10) + 1;//generting no of books from 1 to 10
                
                for(let k =0;k<booknum;k++){
                    const title=faker.lorem.words(3);
                    const likes=faker.datatype.number({ min: 0, max: 10 });
    
                    const book=new Book({
                        title:title,
                        likes,
                        author:author._id
                    });
    
                    await book.save();
                    author.books.push(book._id);
                    await author.save();
                }
             }
        });
            
    }
 }catch(err){
     console.log(err);
    }
};


module.exports=GenerateData;
