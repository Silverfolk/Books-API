const express=require('express');
require("dotenv").config();
require('./DB/conn');
const GenerateData=require('./dummy-data/dummy-data');

const app=express();
const port=process.env.PORT || 3000 ;

const AuthorRouter=require('./routes/authors');
const BookRouter=require('./routes/books')
const AuthenticateRouter=require('./routes/auth')
app.use(express.json());

GenerateData();

app.use(express.urlencoded({ extended: false }));
app.use('/',AuthenticateRouter);
app.use('/authors',AuthorRouter);
app.use('/books',BookRouter);

app.listen(port,()=>{
    console.log(`Connection is Setup at port No ${port}`);
})