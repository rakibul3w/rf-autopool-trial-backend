const bcrypt = require("bcryptjs");
const User = require("../../models/userModel");
const Otp = require("../../models/otpModel");
const Level = require("../../models/levelModel");
const generateString = require("../../config/generateRandomString");
const Withdraw = require("../../models/withdrawModel");
const Topup = require("../../models/topUpModel");
const Wallet = require("../../models/walletModel");
const updateLevelIncome = require("../../config/updateLevelIncome");
const Deposite = require("../../models/depositeModel");
const LevelIncome = require("../../models/levelIncomeModel");
const TransferFund = require("../../models/transferFundModel");
const Cloudinary = require("../../config/cloudinary.js");
const SupportTicket = require("../../models/supportTicketModel");
const Contact = require("../../models/contactUsModel");
const Update = require("../../models/updateModel");
const getIstTime = require("../../config/getTime");
const firstautopool=require('../../models/firstautopoolmodel');
const secondautopool=require('../../models/secondautopoolmodel');
const thirdautopool=require('../../models/thirdautopoolmodel');
const fourthautopool=require('../../models/fourthautopoolmodel');
const fifthautopool=require('../../models/fifthautopoolmodel');
const VIautopool=require('../../models/VIautopoolmodel');
const VIIautopool=require('../../models/VIIautopoolmodel');
const VIIIautopool=require('../../models/VIIIautopoolmodel');
const IXautopool=require('../../models/IXautopoolmodel');
const Xautopool=require('../../models/Xautopoolmodel');
const XIautopool=require('../../models/XIautopoolmodel');
const XIIautopool=require('../../models/XIIautopoolmodel');
const XIIIautopool=require('../../models/XIIIautopoolmodel');
const XIVautopool=require('../../models/XIVautopoolmodel');
const XVautopool=require('../../models/XVautopoolmodel');
const XVIautopool=require('../../models/XVIautopoolmodel');
const boostautopool=require('../../models/boostmodel')



 
 const autopoolhistory=require('../../models/autopoolhistorymodel');

 const calculate_direct_referral=async(user_id)=>{
  const direct=await User.find({sponsor_id:user_id});
  return direct.length;
}



 const addtoboostautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
  
  console.log(thisuser.user_id)
   //add it to autopool if not done already
      if(thisuser.boost_idx==-1){
        console.log("yha aaay")
       let prev_node = await User.find({}).sort({ boost_idx: -1 }).limit(1); //sort in descending

       let idx;
   
       if (!prev_node) {
         idx = 0;
       } 
       else {
   
         //("aaya");
   
         idx = prev_node[0].boost_idx;
   
         idx = idx + 1;
       }
     //saving first idx value
   
   
   
     thisuser.boost_idx = idx;
     console.log(idx);
       await thisuser.save();
   
   
   
       let cur = parseFloat(idx);
   
       //let cur_levl=fun(idx);
   
       
      ////(req.auth);
       let parent_levl = 1;
     
       //going up from child to its parent
   
         if(cur>0){
           cur = parseFloat((cur - 1) / 4);
         while(cur>=0)
         {
                //(cur);
           let parent=await User.findOne({boost_idx:cur});
           
            parent =parent.user_id;
   
          
               

           if(parent_levl==1)
           { 
             
             await updateboostautopool(parent,user_id,parent_levl,1);//this updates the userautopool levelwise
           }

           else if(parent_levl==2)
           {
           await updateboostautopool(parent,user_id,parent_levl,2);//this updates the userautopool levelwise
           }
   
           else
           {
           cur=0;
           }
   
         
           parent_levl++;
   
           if(cur==0){
             break;
           }
           cur = parseFloat((cur - 1) / 4);
   
         }
   
       }
     }

 }

 const updateboostautopool=async(parent,child_userid,level,amount)=>{

  let levelboostautopool=await boostautopool.findOne({Username:parent,level:level});

  //("level-",level)

  console.log("first")
  
  let orgparent=parent;
   
  //checking if it is dummy userid
  if(parent.slice(0,5)==='dummy')
  {
  orgparent=parent.slice(9);
  }
console.log(orgparent)
  if(!levelboostautopool)
  {
  levelboostautopool= await boostautopool.create({
    Username:parent,
    level:level,
    member:0,
    total:0
  })
  }

  await levelboostautopool.save();


  let parentwallet=await Wallet.findOne({user_id:orgparent});

   
   

  //updating parentautopoolincome
    parentwallet.booster_income+=amount;
    let ti=parentwallet.total_income;
    ti=parseFloat(ti);
    ti+=amount;
    parentwallet.total_income=ti;

    await parentwallet.save();
   
    

//updating autoppol schema of that parent or level first autopool

  levelboostautopool.member+=1;
  
  levelboostautopool.total+=amount;
  levelboostautopool.child.push(child_userid)

    await levelboostautopool.save();

    //updating wallet
     //updating autopool transaction history

     const transaction=await autopoolhistory.create({
      Username:parent.user_id,
      child:child_userid,
      level:level,
      amount:amount,
      autopool:"boost"
    })

    await transaction.save();
    

   // //console.log(level,parent.user_id);
}


 const addcommision=async(parent,commision)=>{

  const sponsor =await User.find({user_id:parent}).sponsor_id;

  console.log("finnal")
  //commision to sponsor
  const updatedsponsorwallet=await Wallet.findOne({user_id:sponsor});
  if(updatedsponsorwallet)
  {const tot=updatedsponsorwallet.total_deposite;

   updatedsponsorwallet.total_deposite=tot+commision;

   await updatedsponsorwallet.save();}

   //commisionto admin
   const updatedadminwallet=await Wallet.findOne({user_id:'TLC001'});
   if(updatedadminwallet){
  const tot1=updatedadminwallet.total_deposite;

   updatedadminwallet.total_deposite=tot1+commision;

   await updatedadminwallet.save();
   }

 }

 const checkforcommision=async function(parent,autopool)
 {  
  
  if(autopool===2)
  {console.log("happpppeniiing");
    const pool=await secondautopool.findOne({user_id:parent,level:2});
  
    console.log(pool)
    if(pool && pool.member===9)
    {pool.amount-=10; ;
      await pool.save();
      addcommision(parent,5);
    }
  }
  else if(autopool==3)
  {
    const pool=await thirdautopool.find({user_id:parent,level:2});
  

    if(pool && pool.member===8)
    {pool.amount-=20;
      await pool.save();
      addcommision(parent,10);
    }
  }
  else if(autopool==4)
  {
    const pool=await fourthautopool.find({user_id:parent,level:2});
  

    if(pool && pool.member===8)
    {pool.amount-=30;
      await pool.save();
      addcommision(parent,15);
    }
  }
  else if(autopool==5)
  {
    const pool=await fifthautopool.find({user_id:parent,level:2});
  

    if(pool && pool.member===8)
    {pool.amount-=40;
      await pool.save();
      addcommision(parent,20);
    }
  }
  else if(autopool==6)
  {
    const pool=await VIautopool.find({user_id:parent,level:2});
  

    if(pool && pool.member===8)
    {pool.amount-=50;
      await pool.save();
      addcommision(parent,25);
    }
  }
  else if(autopool==7)
  {
    const pool=await VIIautopool.find({user_id:parent,level:2});
  

    if(pool && pool.member===8)
    {pool.amount-=60;
      await pool.save();
      addcommision(parent,30);
    }
  }
  else if(autopool==8)
  {
    const pool=await VIIIautopool.find({user_id:parent,level:2});
  

    if(pool && pool.member===8)
    {pool.amount-=70;
      await pool.save();
      addcommision(parent,35);
    }
  }
  else if(autopool==9)
  {
    const pool=await IXautopool.find({user_id:parent,level:2});
  

    if(pool && pool.member===8)
    {pool.amount-=80;
      await pool.save();
      addcommision(parent,40);
    }
  }
  else if(autopool==10)
  {
    const pool=await Xautopool.find({user_id:parent,level:2});
  

    if(pool && pool.member===8)
    {pool.amount-=90;
      await pool.save();
      addcommision(parent,45);
    }
  }
  else if(autopool==11)
  {
    const pool=await XIautopool.find({user_id:parent,level:2});
  

    if(pool && pool.member===8)
    {pool.amount-=100;
      await pool.save();
      addcommision(parent,50);
    }
  }
  else if(autopool==12)
  {
    const pool=await XIIautopool.find({user_id:parent,level:2});
  

    if(pool && pool.member===8)
    {pool.amount-=110;
      await pool.save();
      addcommision(parent,55);
    }
  }
  else if(autopool==13)
  {
    const pool=await XIIIautopool.find({user_id:parent,level:2});
  

    if(pool && pool.member===8)
    {pool.amount-=120;
      await pool.save();
      addcommision(parent,60);
    }
  }
  else if(autopool==14)
  {
    const pool=await XIVautopool.find({user_id:parent,level:2});
  

    if(pool && pool.member===8)
    {pool.amount-=130;
      await pool.save();
      addcommision(parent,65);
    }
  }
  else if(autopool==15)
  {
    const pool=await XVautopool.find({user_id:parent,level:2});
  

    if(pool && pool.member===8)
    {pool.amount-=140;
      await pool.save();
      addcommision(parent,70);
    }
  }
  

  

  

 }

 //function to add to first autopool
 const addtofirstautopool=async(user_id)=>{
  //console.log("opoppoop")
   let thisuser=await User.findOne({user_id:user_id});
  
   //add it to autopool if not done already
      if(thisuser.first_idx==-1){
   
       let prev_node = await User.find({}).sort({ first_idx: -1 }).limit(1); //sort in descending
       let idx;
   
       if (!prev_node) {
         idx = 0;
       } 
       else {
   
         //("aaya");
   
         idx = prev_node[0].first_idx;
   
         idx = idx + 1;
       }
     //saving first idx value
   
   
   
     thisuser.first_idx = idx;
     console.log(idx);
       await thisuser.save();
   
   
   
       let cur = parseFloat(idx);
   
       //let cur_levl=fun(idx);
   
       
      ////(req.auth);
       let parent_levl = 1;
     
       //going up from child to its parent
   
         if(cur>0){
           cur = parseFloat((cur - 1) / 3);
         while(cur>=0)
         {
                //(cur);
           let parent=await User.findOne({first_idx:cur});
            //console.log(parent.user_id);
   
            if(parent.user_status){
               ///it checks if it is not deleted by admin
           if(parent_levl==1)
           { 
             
             await updatefirstautopool(parent,user_id,parent_levl,10);//this updates the userautopool levelwise
           }
           else if(parent_levl==2)
           {
           await updatefirstautopool(parent,user_id,parent_levl,10);//this updates the userautopool levelwise
           }
   
           else
           {
           cur=0;
           }
   
         }
           parent_levl++;
   
           if(cur==0){
             break;
           }
           cur = parseFloat((cur - 1) / 3);
   
         }
   
       }
     }
 }

//function to update firstautopool

const updatefirstautopool=async(parent,child_userid,level,amount)=>{

    let levelfirstautopool=await firstautopool.findOne({Username:parent.user_id,level:level});
  
    //("level-",level)
  
    console.log("first")
  

    if(!levelfirstautopool)
    {
    levelfirstautopool= await firstautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }

    await levelfirstautopool.save();

  
    let parentwallet=await Wallet.findOne({user_id:parent.user_id});
  
     
     
  
    //updating parentautopoolincome
   parentwallet.autopool_income+=amount;
      let ti=parentwallet.total_income;
      ti=parseFloat(ti);
      ti+=amount;
      parentwallet.total_income=ti;
  
      await parentwallet.save();
     
      //updating autopool transaction history

      const transaction=await autopoolhistory.create({
        Username:parent.user_id,
        child:child_userid,
        level:level,
        amount:amount,
        autopool:"first"
      })

      await transaction.save();
      
  
  //updating autoppol schema of that parent or level first autopool
  
    levelfirstautopool.member+=1;
    
    levelfirstautopool.total+=amount;
    levelfirstautopool.child.push(child_userid)

      await levelfirstautopool.save();
  
      //updating wallet
  
     // //console.log(level,parent.user_id);
  }


  //function to add to second autopool

  const addtosecondautopool=async(user_id)=>{
  
    let thisuser=await User.findOne({user_id:user_id});
   
    //add it to respective autopool if not done already
       if(thisuser.second_idx==-1){
    
        let prev_node = await User.find({}).sort({ second_idx: -1 }).limit(1); //sort in descending
        let idx;
    
        if (!prev_node) {
          idx = 0;
          //console.log("aayalklk");
        } 
        else {
    
          //console.log("aaya");
    
          idx = prev_node[0].second_idx;
    
          idx = idx + 1;
        }
      //saving first idx value
    
    
    
      thisuser.second_idx = idx;
 
       //console.log(idx);
 
        await thisuser.save();
    
    
    
        let cur = parseFloat(idx);
    
        //let cur_levl=fun(idx);
    
        
       ////(req.auth);
        let parent_levl = 1;
      
        //going up from child to its parent
    
          if(cur>0){
            cur = parseFloat((cur - 1) / 3);
          while(cur>=0)
          {
                 //(cur);
            let parent=await User.findOne({second_idx:cur});
             //console.log(parent.user_id);
    
             if(parent.user_status){
                ///it checks if it is not deleted by admin
            if(parent_levl==1)
            { 
             
              await updatesecondautopool(parent,user_id,parent_levl,20);//this updates the userautopool levelwise
            }
            else if(parent_levl==2)
            {
            
            await updatesecondautopool(parent,user_id,parent_levl,30);//this updates the userautopool levelwise
            }
    
            
            else
            {
            
            cur=0;
            }
    
          }
            parent_levl++;
    
            if(cur==0){
              break;
            }
            cur = parseFloat((cur - 1) / 3);
    
          }
    
        }
      }
  }

  //function to update secondautopool
const updatesecondautopool=async(parent,child_userid,level,amount)=>{


  console.log("updateingilverautopool");

  try{

  let levelsecondautopool=await secondautopool.findOne({Username:parent.user_id,level:level});


  //("level-",level)

  console.log("second")


  if(!levelsecondautopool)
    {
    levelsecondautopool= await secondautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }
 await levelsecondautopool.save();

  let parentwallet=await Wallet.findOne({user_id:parent.user_id});

   
   
  if(await calculate_direct_referral(child_userid)>=2);
{
  //updating parentautopoolincome
    parentwallet.autopool_income+=amount;
    let ti=parentwallet.total_income;
    ti=parseFloat(ti);
    ti+=amount;
    parentwallet.total_income=ti;

    await parentwallet.save();
  }
  
  //updating autopool transaction history

  const transaction=await autopoolhistory.create({
    Username:parent.user_id,
    child:child_userid,
    level:level,
    amount:amount,
    autopool:"second"
  })

  await transaction.save();
  
    

//updating autopool schema of that parent

//updating autoppol schema of that parent or level second autopool
  
levelsecondautopool.member+=1;
levelsecondautopool.child.push(child_userid)
 

   
    await levelsecondautopool.save();
      
    //updating level income update

//updating level income autopool

checkforcommision(parent.user_id,2)

  }
    catch(err)
  {
    console.log(err);
    
  }

}

const addtothirdautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
 
  //add it to respective autopool if not done already
     if(thisuser.third_idx==-1){
  
      let prev_node = await User.find({}).sort({ third_idx: -1 }).limit(1); //sort in descending
      let idx;
  
      if (!prev_node) {
        idx = 0;
        //console.log("aayalklk");
      } 
      else {
  
        //console.log("aaya");
  
        idx = prev_node[0].third_idx;
  
        idx = idx + 1;
      }
    //saving second idx value
  
  
  
    thisuser.third_idx = idx;

     //console.log(idx);

      await thisuser.save();
  
  
  
      let cur = parseFloat(idx);
  
      //let cur_levl=fun(idx);
  
      
     ////(req.auth);
      let parent_levl = 1;
    
      //going up from child to its parent
  
        if(cur>0){
          cur = parseFloat((cur - 1) / 3);
        while(cur>=0)
        {
               //(cur);
          let parent=await User.findOne({third_idx:cur});
           //console.log(parent.user_id);
  
           if(parent.user_status){
              ///it checks if it is not deleted by admin
          if(parent_levl==1)
          { 
           
            await updatethirdautopool(parent,user_id,parent_levl,40);//this updates the userautopool levelwise
          }
          else if(parent_levl==2)
          {
          
          await updatethirdautopool(parent,user_id,parent_levl,40);//this updates the userautopool levelwise
          }
  
          else
          {
          
          cur=0;
          }
  
        }
          parent_levl++;
  
          if(cur==0){
            break;
          }
          cur = parseFloat((cur - 1) / 3);
  
        }
  
      }
    }
}


const updatethirdautopool=async(parent,child_userid,level,amount)=>{


  console.log("updateingthirdautopool");

  let levelthirdautopool=await thirdautopool.findOne({Username:parent.user_id,level:level});
  
    //("level-",level)
  
    console.log("third")
  

    if(!levelthirdautopool)
    {
    levelthirdautopool= await thirdautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }

    await levelthirdautopool.save();

  
    let parentwallet=await Wallet.findOne({user_id:parent.user_id});
  
     
    if(await calculate_direct_referral(child_userid)>=2)
    {
    //updating parentautopoolincome
      parentwallet.autopool_income+=amount;
      let ti=parentwallet.total_income;
      ti=parseFloat(ti);
      ti+=amount;
      parentwallet.total_income=ti;
  
      await parentwallet.save();
      //updating autopool transaction history
    }

      const transaction=await autopoolhistory.create({
        Username:parent.user_id,
        child:child_userid,
        level:level,
        amount:amount,
        autopool:"third"
      })

      await transaction.save();
      
  
  //updating autoppol schema of that parent or level first autopool
  
    levelthirdautopool.member+=1;
    levelthirdautopool.child.push(child_userid);
    levelthirdautopool.total+=amount;

    await levelthirdautopool.save();
     //updating level income update

//updating level income autopool

checkforcommision(parent.user_id,3)
     
  
      //updating wallet
  
     // //console.log(level,parent.user_id);

}


const addtofourthautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
 
  //add it to respective autopool if not done already
     if(thisuser.fourth_idx==-1){
  
      let prev_node = await User.find({}).sort({ fourth_idx: -1 }).limit(1); //sort in descending
      let idx;
  
      if (!prev_node) {
        idx = 0;
        //console.log("aayalklk");
      } 
      else {
  
        //console.log("aaya");
  
        idx = prev_node[0].fourth_idx;
  
        idx = idx + 1;
      }
    //saving third idx value
  
  
  
    thisuser.fourth_idx = idx;

     //console.log(idx);

      await thisuser.save();
  
  
  
      let cur = parseFloat(idx);
  
      //let cur_levl=fun(idx);
  
      
     ////(req.auth);
      let parent_levl = 1;
    
      //going up from child to its parent
  
        if(cur>0){
          cur = parseFloat((cur - 1) / 3);
        while(cur>=0)
        {
               //(cur);
          let parent=await User.findOne({fourth_idx:cur});
           //console.log(parent.user_id);
  
           if(parent.user_status){
              ///it checks if it is not deleted by admin
          if(parent_levl==1)
          { 
           
            await updatefourthautopool(parent,user_id,parent_levl,80);//this updates the userautopool levelwise
          }
          else if(parent_levl==2)
          {
          
          await updatefourthautopool(parent,user_id,parent_levl,80);//this updates the userautopool levelwise
          }
  
         
          else
          {
          
          cur=0;
          }
  
        }
          parent_levl++;
  
          if(cur==0){
            break;
          }
          cur = parseFloat((cur - 1) / 3);
  
        }
  
      }
    }
}

const updatefourthautopool=async(parent,child_userid,level,amount)=>{


  let levelfourthautopool=await fourthautopool.findOne({Username:parent.user_id,level:level});
  
    //("level-",level)
  
    console.log("fourth")
  

    if(!levelfourthautopool)
    {
    levelfourthautopool= await fourthautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }

    await levelfourthautopool.save();

  
    let parentwallet=await Wallet.findOne({user_id:parent.user_id});
  
     
      if(await calculate_direct_referral(child_userid)>=2)
      {
    //updating parentautopoolincome
      parentwallet.autopool_income+=amount;
      let ti=parentwallet.total_income;
      ti=parseFloat(ti);
      ti+=amount;
      parentwallet.total_income=ti;
  
      await parentwallet.save();
      //updating autopool transaction history
      }
      const transaction=await autopoolhistory.create({
        Username:parent.user_id,
        child:child_userid,
        level:level,
        amount:amount,
        autopool:"fourth"
      })

      await transaction.save();
      
  
  //updating autoppol schema of that parent or level first autopool
  
    levelfourthautopool.member+=1;
    levelfourthautopool.child.push(child_userid);
    levelfourthautopool.total+=amount;
    await levelfourthautopool.save();
     // 
      //updating level income autopool
      checkforcommision(parent.user_id,3)
    
      
  
      //updating wallet
  
     // //console.log(level,parent.user_id);
}



const addtofifthautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
 
  //add it to respective autopool if not done already
     if(thisuser.fifth_idx==-1){
  
      let prev_node = await User.find({}).sort({ fifth_idx: -1 }).limit(1); //sort in descending
      let idx;
  
      if (!prev_node) {
        idx = 0;
        //console.log("aayalklk");
      } 
      else {
  
        //console.log("aaya");
  
        idx = prev_node[0].fifth_idx;
  
        idx = idx + 1;
      }
    //saving first idx value
  
  
  
    thisuser.fifth_idx = idx;

     //console.log(idx);

      await thisuser.save();
  
  
  
      let cur = parseFloat(idx);
  
      //let cur_levl=fun(idx);
  
      
     ////(req.auth);
      let parent_levl = 1;
    
      //going up from child to its parent
  
        if(cur>0){
          cur = parseFloat((cur - 1) / 3);
        while(cur>=0)
        {
               //(cur);
          let parent=await User.findOne({fifth_idx:cur});
           //console.log(parent.user_id);
  
           if(parent.user_status){
              ///it checks if it is not deleted by admin
          if(parent_levl==1)
          { 
           
            await updatefifthautopool(parent,user_id,parent_levl,120);//this updates the userautopool levelwise
          }
          else if(parent_levl==2)
          {
          
          await updatefifthautopool(parent,user_id,parent_levl,120);//this updates the userautopool levelwise
          }
  
          
          else
          {
          
          cur=0;
          }
  
        }
          parent_levl++;
  
          if(cur==0){
            break;
          }
          cur = parseFloat((cur - 1) / 3);
  
        }
  
      }
    }
}

const updatefifthautopool=async(parent,child_userid,level,amount)=>{


  let levelfifthautopool=await fifthautopool.findOne({Username:parent.user_id,level:level});
  
  //("level-",level)

  console.log("fifth")


  if(!levelfifthautopool)
  {
  levelfifthautopool= await fifthautopool.create({
    Username:parent.user_id,
    level:level,
    member:0,
    total:0
  })
  }

  await levelfifthautopool.save();


  let parentwallet=await Wallet.findOne({user_id:parent.user_id});

   
  if(await calculate_direct_referral(child_userid)>=2)
{

  //updating parentautopoolincome
    parentwallet.autopool_income+=amount;
    let ti=parentwallet.total_income;
    ti=parseFloat(ti);
    ti+=amount;
    parentwallet.total_income=ti;

    await parentwallet.save();
}
    //updating autopool transaction history

    const transaction=await autopoolhistory.create({
      Username:parent.user_id,
      child:child_userid,
      level:level,
      amount:amount,
      autopool:"fifth"
    })

    await transaction.save();
    

//updating autoppol schema of that parent or level fifth autopool

  levelfifthautopool.member+=1;
  levelfifthautopool.total+=amount;
  levelfifthautopool.child.push(child_userid)
  await levelfifthautopool.save();
   // 
    //updating level income autopool
    checkforcommision(parent.user_id,5)
    
    

    //updating wallet

   // //console.log(level,parent.user_id);

}



const addtoVIautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
 
  //add it to respective autopool if not done already
     if(thisuser.VI_idx==-1){
  
      let prev_node = await User.find({}).sort({ VI_idx: -1 }).limit(1); //sort in descending
      let idx;
  
      if (!prev_node) {
        idx = 0;
        //console.log("aayalklk");
      } 
      else {
  
        //console.log("aaya");
  
        idx = prev_node[0].VI_idx;
  
        idx = idx + 1;
      }
    //saving first idx value
  
  
  
    thisuser.VI_idx = idx;

     //console.log(idx);

      await thisuser.save();
  
  
  
      let cur = parseFloat(idx);
  
      //let cur_levl=fun(idx);
  
      
     ////(req.auth);
      let parent_levl = 1;
    
      //going up from child to its parent
  
        if(cur>0){
          cur = parseFloat((cur - 1) / 3);
        while(cur>=0)
        {
               //(cur);
          let parent=await User.findOne({VI_idx:cur});
           //console.log(parent.user_id);
  
           if(parent.user_status){
              ///it checks if it is not deleted by admin
          if(parent_levl==1)
          { 
           
            await updateVIautopool(parent,user_id,parent_levl,240);//this updates the userautopool levelwise
          }
          else if(parent_levl==2)
          {
          
          await updateVIautopool(parent,user_id,parent_levl,240);//this updates the userautopool levelwise
          }
  
         
          else
          {
          
          cur=0;

          }
  
        }
          parent_levl++;
  
          if(cur==0){
            break;
          }
          cur = parseFloat((cur - 1) / 3);
  
        }
  
      }
    }
}


const updateVIautopool=async(parent,child_userid,level,amount)=>{


  let levelVIautopool=await VIautopool.findOne({Username:parent.user_id,level:level});
  
    //("level-",level)
  
    console.log("VI")
  

    if(!levelVIautopool)
    {
    levelVIautopool= await VIautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }

    await levelVIautopool.save();

  
    let parentwallet=await Wallet.findOne({user_id:parent.user_id});
  
     
    if(await calculate_direct_referral(child_userid)>=2);

    { 
  
    //updating parentautopoolincome
      parentwallet.autopool_income+=amount;
      let ti=parentwallet.total_income;
      ti=parseFloat(ti);
      ti+=amount;
      parentwallet.total_income=ti;
  
      await parentwallet.save();
    }
      //updating autopool transaction history

      const transaction=await autopoolhistory.create({
        Username:parent.user_id,
        child:child_userid,
        level:level,
        amount:amount,
        autopool:"VI"
      })

      await transaction.save();
      
  
  //updating autoppol schema of that parent or level first autopool
  
    levelVIautopool.member+=1;
    levelVIautopool.total+=amount;
    levelVIautopool.child.push(child_userid)
    await levelVIautopool.save();

    //UPDATING LEVEL INCOME COMMISION
    checkforcommision(parent.user_id,6)
 
    }
      
  
      //updating wallet
  
     // //console.log(level,parent.user_id);



const addtoVIIautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
 
  //add it to respective autopool if not done already
     if(thisuser.VII_idx==-1){
  
      let prev_node = await User.find({}).sort({ VII_idx: -1 }).limit(1); //sort in descending
      let idx;
  
      if (!prev_node) {
        idx = 0;
        //console.log("aayalklk");
      } 
      else {
  
        //console.log("aaya");
  
        idx = prev_node[0].VII_idx;
  
        idx = idx + 1;
      }
    //saving first idx value
  
  
  
    thisuser.VII_idx = idx;

     //console.log(idx);

      await thisuser.save();
  
  
  
      let cur = parseFloat(idx);
  
      //let cur_levl=fun(idx);
  
      
     ////(req.auth);
      let parent_levl = 1;
    
      //going up from child to its parent
  
        if(cur>0){
          cur = parseFloat((cur - 1) / 3);
        while(cur>=0)
        {
               //(cur);
          let parent=await User.findOne({VII_idx:cur});
           //console.log(parent.user_id);
  
           if(parent.user_status){
              ///it checks if it is not deleted by admin
          if(parent_levl==1)
          { 
           
            await updateVIIautopool(parent,user_id,parent_levl,480);//this updates the userautopool levelwise
          }
          else if(parent_levl==2)
          {
          
          await updateVIIautopool(parent,user_id,parent_levl,480);//this updates the userautopool levelwise
          }
  
         
          else
          {
          
          cur=0;

          }
  
        }
          parent_levl++;
  
          if(cur==0){
            break;
          }
          cur = parseFloat((cur - 1) / 3);
  
        }
  
      }
    }
}

const updateVIIautopool=async(parent,child_userid,level,amount)=>{


  let levelVIIautopool=await VIIautopool.findOne({Username:parent.user_id,level:level});
  
    //("level-",level)
  
    console.log("VII")
  

    if(!levelVIIautopool)
    {
    levelVIIautopool= await VIIautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }

    await levelVIIautopool.save();

  
    let parentwallet=await Wallet.findOne({user_id:parent.user_id});
  
     
    if(await calculate_direct_referral(child_userid)>=2);
{
  
    //updating parentautopoolincome
      parentwallet.autopool_income+=amount;
      let ti=parentwallet.total_income;
      ti=parseFloat(ti);
      ti+=amount;
      parentwallet.total_income=ti;
  
      await parentwallet.save();
      //updating autopool transaction history
}
      const transaction=await autopoolhistory.create({
        Username:parent.user_id,
        child:child_userid,
        level:level,
        amount:amount,
        autopool:"VII"
      })

      await transaction.save();
      
  
  //updating autoppol schema of that parent or level first autopool
  
    levelVIIautopool.member+=1;
    levelVIIautopool.total+=amount;
    levelVIIautopool.child.push(child_userid)
    await levelVIIautopool.save();
     
      
  
      //updating wallet
      //UPDATING LEVEL WISE COMMISION
     
      checkforcommision(parent.user_id,7)

     // //console.log(level,parent.user_id);
}

const addtoVIIIautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
 
  //add it to respective autopool if not done already
     if(thisuser.VIII_idx==-1){
  
      let prev_node = await User.find({}).sort({ VIII_idx: -1 }).limit(1); //sort in descending
      let idx;
  
      if (!prev_node) {
        idx = 0;
        //console.log("aayalklk");
      } 
      else {
  
        //console.log("aaya");
  
        idx = prev_node[0].VIII_idx;
  
        idx = idx + 1;
      }
    //saving first idx value
  
  
  
    thisuser.VIII_idx = idx;

     //console.log(idx);

      await thisuser.save();
  
  
  
      let cur = parseFloat(idx);
  
      //let cur_levl=fun(idx);
  
      
     ////(req.auth);
      let parent_levl = 1;
    
      //going up from child to its parent
  
        if(cur>0){
          cur = parseFloat((cur - 1) / 3);
        while(cur>=0)
        {
               //(cur);
          let parent=await User.findOne({VIII_idx:cur});
           //console.log(parent.user_id);
  
           if(parent.user_status){
              ///it checks if it is not deleted by admin
          if(parent_levl==1)
          { 
           
            await updateVIIIautopool(parent,user_id,parent_levl,960);//this updates the userautopool levelwise
          }
          else if(parent_levl==2)
          {
          
          await updateVIIIautopool(parent,user_id,parent_levl,960);//this updates the userautopool levelwise
          }
  
         
          else
          {
          
          cur=0;

          }
  
        }
          parent_levl++;
  
          if(cur==0){
            break;
          }
          cur = parseFloat((cur - 1) / 3);
  
        }
  
      }
    }
}


const updateVIIIautopool=async(parent,child_userid,level,amount)=>{


  let levelVIIIautopool=await VIIIautopool.findOne({Username:parent.user_id,level:level});
  
    //("level-",level)
  
    console.log("VIII")
  

    if(!levelVIIIautopool)
    {
    levelVIIIautopool= await VIIIautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }

    await levelVIIIautopool.save();

  
    let parentwallet=await Wallet.findOne({user_id:parent.user_id});
  
     
    if(await calculate_direct_referral(child_userid)>=2);
{
  
    //updating parentautopoolincome
      parentwallet.autopool_income+=amount;
      let ti=parentwallet.total_income;
      ti=parseFloat(ti);
      ti+=amount;
      parentwallet.total_income=ti;
  
      await parentwallet.save();
      //updating autopool transaction history
}
      const transaction=await autopoolhistory.create({
        Username:parent.user_id,
        child:child_userid,
        level:level,
        amount:amount,
        autopool:"VIII"
      })

      await transaction.save();
      
  
  //updating autoppol schema of that parent or level first autopool
  
    levelVIIIautopool.member+=1;
    levelVIIIautopool.total+=amount;
    levelVIIIautopool.child.push(child_userid)
    await levelVIIIautopool.save();
    
    //updatinglevelwiseincome
    checkforcommision(parent.user_id,8)

  
      //updating wallet
  
     // //console.log(level,parent.user_id);
}


const addtoIXautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
 
  //add it to respective autopool if not done already
     if(thisuser.IX_idx==-1){
  
      let prev_node = await User.find({}).sort({ IX_idx: -1 }).limit(1); //sort in descending
      let idx;
  
      if (!prev_node) {
        idx = 0;
        //console.log("aayalklk");
      } 
      else {
  
        //console.log("aaya");
  
        idx = prev_node[0].IX_idx;
  
        idx = idx + 1;
      }
    //saving first idx value
  
  
  
    thisuser.IX_idx = idx;

     //console.log(idx);

      await thisuser.save();
  
  
  
      let cur = parseFloat(idx);
  
      //let cur_levl=fun(idx);
  
      
     ////(req.auth);
      let parent_levl = 1;
    
      //going up from child to its parent
  
        if(cur>0){
          cur = parseFloat((cur - 1) / 3);
        while(cur>=0)
        {
               //(cur);
          let parent=await User.findOne({IX_idx:cur});
           //console.log(parent.user_id);
  
           if(parent.user_status){
              ///it checks if it is not deleted by admin
          if(parent_levl==1)
          { 
           
            await updateIXautopool(parent,user_id,parent_levl,1920);//this updates the userautopool levelwise
          }
          else if(parent_levl==2)
          {
          
          await updateIXautopool(parent,user_id,parent_levl,1920);//this updates the userautopool levelwise
          }
  
         
          else
          {
          
          cur=0;

          }
  
        }
          parent_levl++;
  
          if(cur==0){
            break;
          }
          cur = parseFloat((cur - 1) / 3);
  
        }
  
      }
    }
}

const updateIXautopool=async(parent,child_userid,level,amount)=>{


  let levelIXautopool=await IXautopool.findOne({Username:parent.user_id,level:level});
  
    //("level-",level)
  
    console.log("IX")
  

    if(!levelIXautopool)
    {
    levelIXautopool= await IXautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }

    await levelIXautopool.save();

  
    let parentwallet=await Wallet.findOne({user_id:parent.user_id});
  
     
    if(await calculate_direct_referral(child_userid)>=2);
{
  
    //updating parentautopoolincome
      parentwallet.autopool_income+=amount;
      let ti=parentwallet.total_income;
      ti=parseFloat(ti);
      ti+=amount;
      parentwallet.total_income=ti;
  
      await parentwallet.save();
      //updating autopool transaction history
}
      const transaction=await autopoolhistory.create({
        Username:parent.user_id,
        child:child_userid,
        level:level,
        amount:amount,
        autopool:"IX"
      })

      await transaction.save();
      
  
  //updating autoppol schema of that parent or level first autopool
  
    levelIXautopool.member+=1;
    levelIXautopool.total+=amount;
    levelIXautopool.child.push(child_userid)
    await levelIXautopool.save();
   
      
    //updating level income
    checkforcommision(parent.user_id,9)

      //updating wallet
  
     // //console.log(level,parent.user_id);
}

const addtoXautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
 
  //add it to respective autopool if not done already
     if(thisuser.X_idx==-1){
  
      let prev_node = await User.find({}).sort({ X_idx: -1 }).limit(1); //sort in descending
      let idx;
  
      if (!prev_node) {
        idx = 0;
        //console.log("aayalklk");
      } 
      else {
  
        //console.log("aaya");
  
        idx = prev_node[0].X_idx;
  
        idx = idx + 1;
      }
    //saving first idx value
  
  
  
    thisuser.X_idx = idx;

     //console.log(idx);

      await thisuser.save();
  
  
  
      let cur = parseFloat(idx);
  
      //let cur_levl=fun(idx);
  
      
     ////(req.auth);
      let parent_levl = 1;
    
      //going up from child to its parent
  
        if(cur>0){
          cur = parseFloat((cur - 1) / 3);
        while(cur>=0)
        {
               //(cur);
          let parent=await User.findOne({X_idx:cur});
           //console.log(parent.user_id);
  
           if(parent.user_status){
              ///it checks if it is not deleted by admin
          if(parent_levl==1)
          { 
           
            await updateXautopool(parent,user_id,parent_levl,3840);//this updates the userautopool levelwise
          }
          else if(parent_levl==2)
          {
          
          await updateXautopool(parent,user_id,parent_levl,3840);//this updates the userautopool levelwise
          }
  
         
          else
          {
          
          cur=0;

          }
  
        }
          parent_levl++;
  
          if(cur==0){
            break;
          }
          cur = parseFloat((cur - 1) / 3);
  
        }
  
      }
    }
}

const updateXautopool=async(parent,child_userid,level,amount)=>{


  let levelXautopool=await Xautopool.findOne({Username:parent.user_id,level:level});
  
    //("level-",level)
  
    console.log("X")
  

    if(!levelXautopool)
    {
    levelXautopool= await Xautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }

    await levelXautopool.save();

  
    let parentwallet=await Wallet.findOne({user_id:parent.user_id});
  
     
    if(await calculate_direct_referral(child_userid)>=2);

    { 
  
    //updating parentautopoolincome
      parentwallet.autopool_income+=amount;
      let ti=parentwallet.total_income;
      ti=parseFloat(ti);
      ti+=amount;
      parentwallet.total_income=ti;
  
      await parentwallet.save();
    }
      //updating autopool transaction history

      const transaction=await autopoolhistory.create({
        Username:parent.user_id,
        child:child_userid,
        level:level,
        amount:amount,
        autopool:"X"
      })

      await transaction.save();
      
  
  //updating autoppol schema of that parent or level first autopool
  
    levelXautopool.member+=1;
    levelXautopool.total+=amount;
    levelXautopool.child.push(child_userid)
    await levelXautopool.save();
    
      
    //updating levelincome 
    checkforcommision(parent.user_id,10)

      //updating wallet
  
     // //console.log(level,parent.user_id);
}
  

const addtoXIautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
 
  //add it to respective autopool if not done already
     if(thisuser.XI_idx==-1){
  
      let prev_node = await User.find({}).sort({ XI_idx: -1 }).limit(1); //sort in descending
      let idx;
  
      if (!prev_node) {
        idx = 0;
        //console.log("aayalklk");
      } 
      else {
  
        //console.log("aaya");
  
        idx = prev_node[0].XI_idx;
  
        idx = idx + 1;
      }
    //saving first idx value
  
  
  
    thisuser.XI_idx = idx;

     //console.log(idx);

      await thisuser.save();
  
  
  
      let cur = parseFloat(idx);
  
      //let cur_levl=fun(idx);
  
      
     ////(req.auth);
      let parent_levl = 1;
    
      //going up from child to its parent
  
        if(cur>0){
          cur = parseFloat((cur - 1) / 3);
        while(cur>=0)
        {
               //(cur);
          let parent=await User.findOne({XI_idx:cur});
           //console.log(parent.user_id);
  
           if(parent.user_status){
              ///it checks if it is not deleted by admin
          if(parent_levl==1)
          { 
           
            await updateXIautopool(parent,user_id,parent_levl,7680);//this updates the userautopool levelwise
          }
          else if(parent_levl==2)
          {
          
          await updateXIautopool(parent,user_id,parent_levl,7680);//this updates the userautopool levelwise
          }
  
         
          else
          {
          
          cur=0;

          }
  
        }
          parent_levl++;
  
          if(cur==0){
            break;
          }
          cur = parseFloat((cur - 1) / 3);
  
        }
  
      }
    }
}

const updateXIautopool=async(parent,child_userid,level,amount)=>{


  let levelXIautopool=await XIautopool.findOne({Username:parent.user_id,level:level});
  
    //("level-",level)
  
    console.log("XI")
  

    if(!levelXIautopool)
    {
    levelXIautopool= await XIautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }

    await levelXIautopool.save();

  
    let parentwallet=await Wallet.findOne({user_id:parent.user_id});
  
     
     
    if(await calculate_direct_referral(child_userid)>=2);

    { 
    //updating parentautopoolincome
      parentwallet.autopool_income+=amount;
      let ti=parentwallet.total_income;
      ti=parseFloat(ti);
      ti+=amount;
      parentwallet.total_income=ti;
  
      await parentwallet.save();
      //updating autopool transaction history
    }
      const transaction=await autopoolhistory.create({
        Username:parent.user_id,
        child:child_userid,
        level:level,
        amount:amount,
        autopool:"XI"
      })

      await transaction.save();
      
  
  //updating autoppol schema of that parent or level first autopool
  
    levelXIautopool.member+=1;
    levelXIautopool.total+=amount;
    levelXIautopool.child.push(child_userid)
    await levelXIautopool.save();

     // 

      //updating level income autopool
      checkforcommision(parent.user_id,11)

    
  
      //updating wallet
  
     // //console.log(level,parent.user_id);
}

const addtoXIIautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
 
  //add it to respective autopool if not done already
     if(thisuser.XII_idx==-1){
  
      let prev_node = await User.find({}).sort({ XII_idx: -1 }).limit(1); //sort in descending
      let idx;
  
      if (!prev_node) {
        idx = 0;
        //console.log("aayalklk");
      } 
      else {
  
        //console.log("aaya");
  
        idx = prev_node[0].XII_idx;
  
        idx = idx + 1;
      }
    //saving first idx value
  
  
  
    thisuser.XII_idx = idx;

     //console.log(idx);

      await thisuser.save();
  
  
  
      let cur = parseFloat(idx);
  
      //let cur_levl=fun(idx);
  
      
     ////(req.auth);
      let parent_levl = 1;
    
      //going up from child to its parent
  
        if(cur>0){
          cur = parseFloat((cur - 1) / 3);
        while(cur>=0)
        {
               //(cur);
          let parent=await User.findOne({XII_idx:cur});
           //console.log(parent.user_id);
  
           if(parent.user_status){
              ///it checks if it is not deleted by admin
          if(parent_levl==1)
          { 
           
            await updateXIIautopool(parent,user_id,parent_levl,15360);//this updates the userautopool levelwise
          }
          else if(parent_levl==2)
          {
          
          await updateXIIautopool(parent,user_id,parent_levl,15360);//this updates the userautopool levelwise
          }
  
         
          else
          {
          
          cur=0;

          }
  
        }
          parent_levl++;
  
          if(cur==0){
            break;
          }
          cur = parseFloat((cur - 1) / 3);
  
        }
  
      }
    }
}

const updateXIIautopool=async(parent,child_userid,level,amount)=>{


  let levelXIIautopool=await XIIautopool.findOne({Username:parent.user_id,level:level});
  
    //("level-",level)
  
    console.log("XII")
  

    if(!levelXIIautopool)
    {
    levelXIIautopool= await XIIautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }

    await levelXIIautopool.save();

  
    let parentwallet=await Wallet.findOne({user_id:parent.user_id});
  
     
     
  
    //updating parentautopoolincome
      parentwallet.autopool_income+=amount;
      let ti=parentwallet.total_income;
      ti=parseFloat(ti);
      ti+=amount;
      parentwallet.total_income=ti;
  
      await parentwallet.save();
      //updating autopool transaction history

      const transaction=await autopoolhistory.create({
        Username:parent.user_id,
        child:child_userid,
        level:level,
        amount:amount,
        autopool:"XII"
      })

      await transaction.save();
      
  
  //updating autoppol schema of that parent or level first autopool
  
    levelXIIautopool.member+=1;
    levelXIIautopool.total+=amount;
    levelXIIautopool.child.push(child_userid)
    await levelXIIautopool.save();
     // 

   
      
  
      //updating wallet
      //updating level
      checkforcommision(parent.user_id,12)

  
     // //console.log(level,parent.user_id);
}


const addtoXIVautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
 
  //add it to respective autopool if not done already
     if(thisuser.XIV_idx==-1){
  
      let prev_node = await User.find({}).sort({ XIV_idx: -1 }).limit(1); //sort in descending
      let idx;
  
      if (!prev_node) {
        idx = 0;
        //console.log("aayalklk");
      } 
      else {
  
        //console.log("aaya");
  
        idx = prev_node[0].XIV_idx;
  
        idx = idx + 1;
      }
    //saving first idx value
  
  
  
    thisuser.XIV_idx = idx;

     //console.log(idx);

      await thisuser.save();
  
  
  
      let cur = parseFloat(idx);
  
      //let cur_levl=fun(idx);
  
      
     ////(req.auth);
      let parent_levl = 1;
    
      //going up from child to its parent
  
        if(cur>0){
          cur = parseFloat((cur - 1) / 3);
        while(cur>=0)
        {
               //(cur);
          let parent=await User.findOne({XIV_idx:cur});
           //console.log(parent.user_id);
  
           if(parent.user_status){
              ///it checks if it is not deleted by admin
          if(parent_levl==1)
          { 
           
            await updateXIVautopool(parent,user_id,parent_levl,61440);//this updates the userautopool levelwise
          }
          else if(parent_levl==2)
          {
          
          await updateXIVautopool(parent,user_id,parent_levl,61440);//this updates the userautopool levelwise
          }
  
         
          else
          {
          
          cur=0;

          }
  
        }
          parent_levl++;
  
          if(cur==0){
            break;
          }
          cur = parseFloat((cur - 1) / 3);
  
        }
  
      }
    }
}

const updateXIVautopool=async(parent,child_userid,level,amount)=>{


  let levelXIVautopool=await XIVautopool.findOne({Username:parent.user_id,level:level});
  
    //("level-",level)
  
    console.log("XIV")
  

    if(!levelXIVautopool)
    {
    levelXIVautopool= await XIVautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }

    await levelXIVautopool.save();

  
    let parentwallet=await Wallet.findOne({user_id:parent.user_id});
  
     
     
  
    //updating parentautopoolincome
      parentwallet.autopool_income+=amount;
      let ti=parentwallet.total_income;
      ti=parseFloat(ti);
      ti+=amount;
      parentwallet.total_income=ti;
  
      await parentwallet.save();
      //updating autopool transaction history

      const transaction=await autopoolhistory.create({
        Username:parent.user_id,
        child:child_userid,
        level:level,
        amount:amount,
        autopool:"XIV"
      })

      await transaction.save();
      
  
  //updating autoppol schema of that parent or level first autopool
  
    levelXIVautopool.member+=1;
    levelXIVautopool.total+=amount;
    levelXIVautopool.child.push(child_userid)
    await levelXIVautopool.save();
     // 
      //updating level income autopool
   
     //updating levelwise
     checkforcommision(parent.user_id,14)

  
      //updating wallet
  
     // //console.log(level,parent.user_id);
}


const addtoXIIIautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
 
  //add it to respective autopool if not done already
     if(thisuser.XIII_idx==-1){
  
      let prev_node = await User.find({}).sort({ XIII_idx: -1 }).limit(1); //sort in descending
      let idx;
  
      if (!prev_node) {
        idx = 0;
        //console.log("aayalklk");
      } 
      else {
  
        //console.log("aaya");
  
        idx = prev_node[0].XIII_idx;
  
        idx = idx + 1;
      }
    //saving first idx value
  
  
  
    thisuser.XIII_idx = idx;

     //console.log(idx);

      await thisuser.save();
  
  
  
      let cur = parseFloat(idx);
  
      //let cur_levl=fun(idx);
  
      
     ////(req.auth);
      let parent_levl = 1;
    
      //going up from child to its parent
  
        if(cur>0){
          cur = parseFloat((cur - 1) / 3);
        while(cur>=0)
        {
               //(cur);
          let parent=await User.findOne({XIII_idx:cur});
           //console.log(parent.user_id);
  
           if(parent.user_status){
              ///it checks if it is not deleted by admin
          if(parent_levl==1)
          { 
           
            await updateXIIIautopool(parent,user_id,parent_levl,30720);//this updates the userautopool levelwise
          }
          else if(parent_levl==2)
          {
          
          await updateXIIIautopool(parent,user_id,parent_levl,30720);//this updates the userautopool levelwise
          }
  
         
          else
          {
          
          cur=0;

          }
  
        }
          parent_levl++;
  
          if(cur==0){
            break;
          }
          cur = parseFloat((cur - 1) / 3);
  
        }
  
      }
    }
}

const updateXIIIautopool=async(parent,child_userid,level,amount)=>{


  let levelXIIIautopool=await XIIIautopool.findOne({Username:parent.user_id,level:level});
  
    //("level-",level)
  
    console.log("XIII")
  

    if(!levelXIIIautopool)
    {
    levelXIIIautopool= await XIIIautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }

    await levelXIIIautopool.save();

  
    let parentwallet=await Wallet.findOne({user_id:parent.user_id});
  
     
     
  
    //updating parentautopoolincome
      parentwallet.autopool_income+=amount;
      let ti=parentwallet.total_income;
      ti=parseFloat(ti);
      ti+=amount;
      parentwallet.total_income=ti;
  
      await parentwallet.save();
      //updating autopool transaction history

      const transaction=await autopoolhistory.create({
        Username:parent.user_id,
        child:child_userid,
        level:level,
        amount:amount,
        autopool:"XIII"
      })

      await transaction.save();
      
  
  //updating autoppol schema of that parent or level first autopool
  
    levelXIIIautopool.member+=1;
    levelXIIIautopool.total+=amount;
    levelXIIIautopool.child.push(child_userid)
    await levelXIIIautopool.save();
     // 
      //updating level income autopool
      checkforcommision(parent.user_id,13)

     
  
      //updating wallet
  
     // //console.log(level,parent.user_id);
}

const addtoXVautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
 
  //add it to respective autopool if not done already
     if(thisuser.XV_idx==-1){
  
      let prev_node = await User.find({}).sort({ XV_idx: -1 }).limit(1); //sort in descending
      let idx;
  
      if (!prev_node) {
        idx = 0;
        //console.log("aayalklk");
      } 
      else {
  
        //console.log("aaya");
  
        idx = prev_node[0].XV_idx;
  
        idx = idx + 1;
      }
    //saving first idx value
  
  
  
    thisuser.XV_idx = idx;

     //console.log(idx);

      await thisuser.save();
  
  
  
      let cur = parseFloat(idx);
  
      //let cur_levl=fun(idx);
  
      
     ////(req.auth);
      let parent_levl = 1;
    
      //going up from child to its parent
  
        if(cur>0){
          cur = parseFloat((cur - 1) / 3);
        while(cur>=0)
        {
               //(cur);
          let parent=await User.findOne({XV_idx:cur});
           //console.log(parent.user_id);
  
           if(parent.user_status){
              ///it checks if it is not deleted by admin
          if(parent_levl==1)
          { 
           
            await updateXVautopool(parent,user_id,parent_levl,122880);//this updates the userautopool levelwise
          }
          else if(parent_levl==2)
          {
          
          await updateXVautopool(parent,user_id,parent_levl,122880);//this updates the userautopool levelwise
          }
  
         
          else
          {
          
          cur=0;

          }
  
        }
          parent_levl++;
  
          if(cur==0){
            break;
          }
          cur = parseFloat((cur - 1) / 3);
  
        }
  
      }
    }
}


const updateXVautopool=async(parent,child_userid,level,amount)=>{


  let levelXVautopool=await XVautopool.findOne({Username:parent.user_id,level:level});
  
    //("level-",level)
  
    console.log("XV")
  

    if(!levelXVautopool)
    {
    levelXVautopool= await XVautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }

    await levelXVautopool.save();

  
    let parentwallet=await Wallet.findOne({user_id:parent.user_id});
  
     
     
  
    //updating parentautopoolincome
      parentwallet.autopool_income+=amount;
      let ti=parentwallet.total_income;
      ti=parseFloat(ti);
      ti+=amount;
      parentwallet.total_income=ti;
  
      await parentwallet.save();
      //updating autopool transaction history

      const transaction=await autopoolhistory.create({
        Username:parent.user_id,
        child:child_userid,
        level:level,
        amount:amount,
        autopool:"XV"
      })

      await transaction.save();
      
  
  //updating autoppol schema of that parent or level first autopool
  
    levelXVautopool.member+=1;
    levelXVautopool.total+=amount;
    levelXVautopool.child.push(child_userid)
    await levelXVautopool.save();
     // 
      //updating level income autopool
      checkforcommision(parent.user_id,15)

      
  
      //updating wallet
  
     // //console.log(level,parent.user_id);
}

const addtoXVIautopool=async(user_id)=>{
  
  let thisuser=await User.findOne({user_id:user_id});
 
  //add it to respective autopool if not done already
     if(thisuser.XVI_idx==-1){
  
      let prev_node = await User.find({}).sort({ XVI_idx: -1 }).limit(1); //sort in descending
      let idx;
  
      if (!prev_node) {
        idx = 0;
        //console.log("aayalklk");
      } 
      else {
  
        //console.log("aaya");
  
        idx = prev_node[0].XVI_idx;
  
        idx = idx + 1;
      }
    //saving first idx value
  
  
  
    thisuser.XVI_idx = idx;

     //console.log(idx);

      await thisuser.save();
  
  
  
      let cur = parseFloat(idx);
  
      //let cur_levl=fun(idx);
  
      
     ////(req.auth);
      let parent_levl = 1;
    
      //going up from child to its parent
  
        if(cur>0){
          cur = parseFloat((cur - 1) / 3);
        while(cur>=0)
        {
               //(cur);
          let parent=await User.findOne({XVI_idx:cur});
           //console.log(parent.user_id);
  
           if(parent.user_status){
              ///it checks if it is not deleted by admin
          if(parent_levl==1)
          { 
           
            await updateXVIautopool(parent,user_id,parent_levl,122880);//this updates the userautopool levelwise
          }
          else if(parent_levl==2)
          {
          
          await updateXVIautopool(parent,user_id,parent_levl,122880);//this updates the userautopool levelwise
          }
  
         
          else
          {
          
          cur=0;

          }
  
        }
          parent_levl++;
  
          if(cur==0){
            break;
          }
          cur = parseFloat((cur - 1) / 3);
  
        }
  
      }
    }
}

const updateXVIautopool=async(parent,child_userid,level,amount)=>{


  let levelXVIautopool=await XVIautopool.findOne({Username:parent.user_id,level:level});
  
    //("level-",level)
  
    console.log("XVI")
  

    if(!levelXVIautopool)
    {
    levelXVIautopool= await XVIautopool.create({
      Username:parent.user_id,
      level:level,
      member:0,
      total:0
    })
    }

    await levelXVIautopool.save();

  
    let parentwallet=await Wallet.findOne({user_id:parent.user_id});
  
     
     
  
    //updating parentautopoolincome
      parentwallet.autopool_income+=amount;
      let ti=parentwallet.total_income;
      ti=parseFloat(ti);
      ti+=amount;
      parentwallet.total_income=ti;
  
      await parentwallet.save();
      //updating autopool transaction history

      const transaction=await autopoolhistory.create({
        Username:parent.user_id,
        child:child_userid,
        level:level,
        amount:amount,
        autopool:"XVI"
      })

      await transaction.save();
      
  
  //updating autoppol schema of that parent or level first autopool
  
    levelXVIautopool.member+=1;
    levelXVIautopool.total+=amount;
    levelXVIautopool.child.push(child_userid)
    await levelXVIautopool.save();
     // 
      //updating level income autopool
      checkforcommision(parent.user_id,15)

      
  
      //updating wallet
  
     // //console.log(level,parent.user_id);
}





  module.exports={addtofirstautopool,addtosecondautopool,addtothirdautopool,addtofourthautopool,addtofifthautopool,addtoVIautopool,addtoVIIautopool,
    addtoVIIIautopool,addtoVIIIautopool,addtoIXautopool,addtoXautopool,addtoXIautopool,addtoXIIautopool,addtoXIIIautopool,addtoXIVautopool,addtoXVautopool,addtoXVIautopool,addtoboostautopool};
