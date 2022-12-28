const Author=require('../Models/authors');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();

const SignUp= (req,res,next)=>{
    let name=req.body.name;
    let password=req.body.password;
    let email=req.body.email;
    let phone=req.body.phone;
    console.log(name+" "+password+" "+email+" "+phone);
   bcrypt.hash(password,10,(err,hash)=>{
   if(err){
      return res.status(500).json({
        message:"Something is wrong",
          error:err
      })
   }
   else{
  
      const author=new Author({
          name:name,
          password:hash,
          email:email,
          phone:phone
      })  
  
      author.save()
      .then((result)=>{
       res.status(200).json({
          new_user:result
       });
      })
      .catch((err)=>{
          res.status(500).json({
              error:err
           });
      })
   }
  
   })
  };

const Login= async (req,res,next)=>{
    Author.find({email:req.body.email}).exec()
    .then(user=>{
       if(user.length<1){
          return res.status(401).json({
             msg:"User doesn't Exists"
          })
       }
 
       bcrypt.compare(req.body.password,user[0].password,async(err,result)=>{
          if(!result){
             return res.status(401).json({
                msg:"password matching fail"
             })
          }
 
          if(result){
           const token=jwt.sign({
             userId:user[0]._id
           },
           process.env.ACCESS_TOKEN_SECRET ,{expiresIn:"24h"}
           );
         
           let oldTokens=user.tokens || [] ;
            if(oldTokens.length){
             oldTokens=oldTokens.filter(t=>{
                     const timediff=(Date.now()-parseInt(t.signedAt))/1000;
                     if(timediff<86400){
                        return t;
                     }
                })
            }
            await Author.findByIdAndUpdate(user[0]._id,{tokens:[...oldTokens,{tokens:token,signedAt:Date.now().toString()}]});
            
            res.status(200).json({
             authorname:user[0].name,
             authoremail:user[0].email,
             authorphone:user[0].phone,
             token:token
           })
          }
       })
    })
    .catch(err=>{
        console.log(err);
       res.status(500).json({
          err:err
          
       })
    })
 };

const Logout=async (req,res)=>{
    if(req.headers && req.headers.authorization){
        const token=req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({success:false,message:'Authorization failed '});
        }

        const tokens=req.user.tokens; 
        const newTokens = tokens.filter(t => t.token !== token);
        await Author.findByIdAndUpdate(req.user._id, { tokens: [] });
        //   console.log(req.user._id+" "+newTokens.tokens);   
        res.json({ success: true, message: 'Sign out successfully!' });
      
    }
}

module.exports = { SignUp,Login,Logout };