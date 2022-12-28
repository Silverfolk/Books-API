const mongoose=require('mongoose');
require('dotenv').config();
const db_Link=process.env.DATABASE_LINK;
mongoose.connect(db_Link)
.then((db)=>{
    console.log('db connected');
})
.catch((err)=>{
    console.log(err);
})

