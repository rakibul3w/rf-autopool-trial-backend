const mongoose=require('mongoose');




const userpoolhistory=mongoose.Schema({
    Username:{
        type:String,
       required:true
    },
    child:{
        type:String,
       required:true
    },
   level:{
    type:Number,
    required:true
   
   },
   
   amount:{
   type:Number,
   default:0
   },
   autopool:{
    type:String,
    required:true
   }
   
}
,{ timestamps: true }
);

const autopoolhistory=new mongoose.model('autopoolhistory',userpoolhistory);

module.exports=autopoolhistory