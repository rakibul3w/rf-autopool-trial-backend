const mongoose=require('mongoose');




const userpoolhistory=mongoose.Schema({
    Username:{
        type:String,
       required:true
    },
   amount:{
   type:Number,
   default:0
   },
   updatedautopool:{
    type:String,
    required:true
   }
   
}
,{ timestamps: true }
);

const autopoolupdatehistory=new mongoose.model('autopoolupdatehistory',userpoolhistory);

module.exports=autopoolupdatehistory