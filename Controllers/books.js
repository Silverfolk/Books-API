const Authors=require('../Models/authors');
const Books=require('../Models/books');
const AllBooks=async (req,res) =>{
    try{
      let book=await Books.find();
      let arr=[];
    //    res.status(200).send(book);
     for(let i =0;i<book.length;i++){
        await book[i].populate({
            path:"author",
            select:{name:1,
                BooksLiked:1,
                _id:0}
          });
          arr.push({
           BookName:book[i].title,
           NoofLikes:book[i].likes,
           Author:book[i].author.name
          });
     }
     
       if(req.query.sort==='desc'){
        arr.sort((x,y)=>y.NoofLikes-x.NoofLikes);
       } 
       else if(req.query.sort==='asc'){
        arr.sort((x,y)=>x.NoofLikes-y.NoofLikes);
       }
     
    res.status(200).send(arr);
    }
    catch(err){
        console.log(err);
        res.status(404).send(err);
    }
}

const Liked=async (req,res) =>{
    try{
       let userId=req.body.id;
       let book=await Books.findById(req.params.id);
       let author=await Authors.findById(userId);
      
       if(!book){
        return res.status(400).send("Invalid Book ID");
       }
       if(!author){
        return res.status(400).send("Invalid Author ID");
       }

       let idx=-1;
       let BookID=book._id;
       for(let i =0;i<author.BooksLiked.length;i++){
           if(JSON.stringify(author.BooksLiked[i])===JSON.stringify(BookID)){
            idx=i;
            break;
           }
       }
  

       if(idx===-1){
        book.likes++;
        author.BooksLiked.push(BookID);
        await book.save();
        await author.save();
       res.status(200).send(book);
       }
       else {
        res.status(200).send("Book Is Already Liked");
       }
    

    }
    catch(err){
        console.log(err);
        res.status(404).send(err);
    }
}

const Unliked=async (req,res) =>{
    try{
        let userId=req.body.id;
        let book=await Books.findById(req.params.id);
        let author=await Authors.findById(userId);
       
        if(!book){
         return res.status(400).send("Invalid Book ID");
        }
        if(!author){
         return res.status(400).send("Invalid Author ID");
        }
 
        let idx=-1;
        let BookID=book._id;
        for(let i =0;i<author.BooksLiked.length;i++){
            if(JSON.stringify(author.BooksLiked[i])===JSON.stringify(BookID)){
             idx=i;
             break;
            }
        }
   
 
        if(idx!==-1){
         book.likes--;
          author.BooksLiked.splice(idx,1);
         await book.save();
         await author.save();
        res.status(200).send(book);
        }
        else {
         res.status(200).send("Book Is Not Liked By You");
        }
     
    }
    catch(err){
        console.log(err);
        res.status(404).send(err);
    }
}




module.exports={AllBooks,Liked,Unliked};