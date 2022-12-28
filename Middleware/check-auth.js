const jwt=require('jsonwebtoken');
require("dotenv").config();

const Author=require('../Models/authors');
module.exports= async (req,res,next)=>{
    try{
    const token=req.headers.authorization.split(" ")[1];
    
    const verify=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const user=await Author.findById(verify.userId);
    if (!user) {
        return res.json({ success: false, message: 'unauthorized access!' });
      }
    req.user=user;
    next();
    }
    catch(error){
        console.log(error);
     return res.status(401).json({
        msg:'invalid token'
     })
    }
}