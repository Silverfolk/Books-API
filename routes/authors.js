const express=require('express');
const Router =express.Router();
const auth=require('../middleware/check-auth');
const { json } = require('body-parser');
const {AuthorsDetails,LoggedInAuthors,AuthorsById} =require('../Controllers/authors')

Router.get('/',auth,AuthorsDetails);
Router.get('/me',auth, LoggedInAuthors);
Router.route("/:id").get( auth,AuthorsById);

module.exports=Router;