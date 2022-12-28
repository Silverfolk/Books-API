const Authors=require('../Models/authors');

const AuthorsDetails=async (req,res)=>{
    try{
      let author=await Authors.find({});
      let arr=[];

      for(let i =0;i<author.length;i++){
        const length=author[i].books.length;
         
        await author[i].populate( [{
           path:"BooksLiked",
           select:{title:1}
        },{
              path:"books",
              select:{title:1,_id:0,likes:1}
        }]);

        arr.push({
            authorName: author[i].name,
            LikedBooks:author[i].BooksLiked,
            BooksWritten:author[i].books,
            NoOfBooksWritten:author[i].books.length ,
        });

      }
      // console.log(arr);
      res.status(200).send(arr);
    }
    catch(err){
        res.status(401).send(err);
    }
}

const LoggedInAuthors=async(req,res)=>{
  try{
   

    // console.log(req);
      const author = await Authors.findOne({ _id: req.user._id });
       
        await author.populate([
         { path:"BooksLiked",
          select:{author: 0,
            __id: 0,
            __v: 0}
         },
         {
          path:"books",
          select:{title:1}
         }
]);

        const authorDetails = author.toJSON(1);

        res.status(200).send(authorDetails);
  
}
  catch(err){
    console.log(err);
      res.status(401).send(err);
  }
}

const AuthorsById=async (req,res)=>{
  try{
     let authordata=await Authors.findById({_id:req.params.id});
     if(!authordata){
      return res.status(404).send()
     }
     else{
        //  res.send(authordata);
        await authordata.
        populate({
          path:"books",
          select:{title:1,likes:1,_id:0}
        });
        const arr=[];
       
        for(let i =0;i<authordata.books.length;i++){
          arr.push(authordata.books[i].title);
        }
        console.log(authordata);
        res.status(200).send({authorname: authordata.name,authoremail:authordata.email,authorphone:authordata.phone,authorID:authordata._id,books:arr});
     }
  }
  catch(err){
    console.log(err);
    res.status(401).send(err);
  }
}
module.exports={AuthorsDetails,LoggedInAuthors,AuthorsById};