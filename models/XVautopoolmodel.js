const mongoose=require('mongoose');




const userpool=mongoose.Schema({
    Username:{
        type:String,
       required:true
    },
   level:{
    type:Number,
    required:true
   
   },
   member:{
    type:Number,
    required:true
   },
   child:{
    type:Array,
    default:[]
   },
   total:{
   type:Number,
   default:0
   }
});

const XVautopool=new mongoose.model('xvautopool',userpool);

module.exports=XVautopool;