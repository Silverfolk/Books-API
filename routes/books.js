const express=require('express');
const Router =express.Router();
const mongoose=require('mongoose');

const auth=require('../Controllers/auth');
const {AllBooks,Liked,Unliked}=require('../Controllers/books');

Router.get('/',AllBooks);
Router.put('/like/:id',Liked);
Router.put('/unlike/:id',Unliked);

module.exports=Router;