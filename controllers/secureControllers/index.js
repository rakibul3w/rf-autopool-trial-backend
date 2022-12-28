const bcrypt = require("bcryptjs");
const express = require('express');
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
const boostautopool=require('../../models/boostmodel');
const autopoolhistory=require('../../models/autopoolhistorymodel')
const autopoolupdatehistory=require('../../models/autopoolupdatehistorymodel');
let {autopoolcontrol}=require('../../config/variables');
const transferFund=require('../../models/transferFundModel');


 
 const app = express();

 const {addtofirstautopool,addtosecondautopool,addtothirdautopool,addtofourthautopool,addtofifthautopool,addtoVIautopool,addtoVIIautopool,
  addtoVIIIautopool,addtoIXautopool,addtoXautopool,addtoXIautopool,addtoXIIautopool,addtoXIIIautopool,addtoXIVautopool,addtoXVautopool,addtoboostautopool}=require('../../config/autopool/autopoolcontrollers');
const GiftIncome = require("../../models/giftIncomeModel");
const { userAnalytics } = require("../privateControllers");
const UserActivationIncome = require("../../models/userActivationIncomeModel");
const RewardIncome = require("../../models/rewardModel");
const DirectWithdrawIncome = require("../../models/directWithdrawIncomeMode");
const GiftedUser = require("../../models/giftedUserModel");
const DirectFundtransferIncome = require("../../models/directFundtransferIncome");

const royaltyincomehistory=async(req,res)=>{

  const data=await transferFund.find({
    user_id:'RFC001',
    receiver_id:req.auth.id,
  });

  await data.save();

  res.status(201).json(data);

}

const getboostupdatehistory=async(req,res)=>{

  let data=await autopoolupdatehistory.find({Username:req.auth.id,updatedautopool:"boost"});

  res.status(201).json(data);

}


const getboosterhistory=async(req,res)=>{
  const user_id=req.auth.id;

  const data=[];

  let history=await autopoolhistory.find({autopool:"boost",Username:user_id});

  data.push(history);

  const dummy=await User.find({name:'dummy'});
  

  for(const v of dummy)
  {  
    let userid=v.user_id;
    console.log(userid)

    userid=userid.slice(9)
    if(userid===user_id)
    { 
      if(v.boost_idx!=-1){
    
        let history=await autopoolhistory.find({autopool:"boost",Username:v.user_id});
      data.push(history);

      }

    }
  }

  res.status(201).json(data);
  
}


const getcurrentautopool=async(req,res)=>{
 
const thisuser=await User.findOne({user_id:req.auth.id});

  let currentlevel=0;

        if(thisuser.XV_idx!=-1)
        {
          currentlevel=15;
        }
        else if(thisuser.XIV_idx!=-1)
        {
          currentlevel=14;
        }
        
        else if(thisuser.XIII_idx!=-1)
        {
          currentlevel=13;
        }
        else if(thisuser.XII_idx!=-1)
        {
            currentlevel=12;
        }
        else if(thisuser.XI_idx!=-1)
        {
          currentlevel=11;
        }
        else if(thisuser.X_idx!=-1)
        {
          currentlevel=10;
        }
        else if(thisuser.IX_idx!=-1)
        {
          currentlevel=9;
        }
        else if(thisuser.VIII_idx!=-1)
        {
          currentlevel=8;
        }
        else if(thisuser.VII_idx!=-1)
        {
          currentlevel=7;
        }
        else if(thisuser.VI_idx!=-1)
        {
          currentlevel=6;
        }
        else if(thisuser.fifth_idx!=-1)
        {
          currentlevel=5;
        }
        else if(thisuser.fourth_idx!=-1)
        {
          currentlevel=4;
        }
        else if(thisuser.third_idx!=-1)
        {
          currentlevel=3;
        }
        else if(thisuser.second_idx!=-1)
        {
          currentlevel=2;
        }
        else if(thisuser.first_idx!=-1)
        {
          currentlevel=1;
        }

        res.status(201).json({"currentautopool":currentlevel});
}
  //for boostautopooltopup tree structure
 const getautopoolupdatehistory=async(req,res)=>{
  const data=await autopoolupdatehistory.find({Username:req.auth.id});
  res.status(201).json(data);
 }
const boosttopup=async(req,res)=>{
    try {
     

    let { user_id, packages, trx_password } = req.body;
    const userId = req.auth.id;
   
 
    if (!user_id || !packages) {
      res.status(400).json({message: "Please Enter all the Fields"});
    }
  
    else if(user_id !== userId){
      res.status(400).json({message: "Invalid user id"})
    }
  
    else{
      
      const thisuser = await User.findOne({ user_id: userId });
       
     
      const existingWallet = await Wallet.findOne({ user_id: userId });
      
      //if (user && trx_password === user.trx_password) {
        if(true){
          
        let depositeBalance = parseFloat(existingWallet.total_deposite);
        let totalIncome = parseFloat(existingWallet.total_income);
        packages=parseFloat(packages)
        
  
        //here deposit balance + total income sums upto present amount of user 
           
         console.log( depositeBalance,totalIncome,packages)
  
        if(( depositeBalance + totalIncome) >= packages)
        {  
          

            console.log(thisuser.boost_idx)
          if(thisuser.boost_idx!==-1 && packages==10)
          {   console.log("doubling")


            const odd=Math.floor(1000 + Math.random() * 9000);

            const dummyusername=`dummy${odd}${user_id}`;

            const dummyuser=await User.create({
              name:'dummy',
              user_id:dummyusername,
              email: `"dummy"${odd}'dummy@gmail.com'`,
              password: '7hkhk@hh^57gjmhgjkH',
              mobile: `${odd}98${odd}`,
              sponsor_id: 'hhk',
              sponsor_name: 'hkjhkjh',
              token: 'jkhkjhkjhkjhkhkhjljjljlj',
              trx_password: 'gjhkjhkhkhkhhh',
              wallet_address: "",

            })

            dummyuser.save();
              
            //console.log(dummy,user_id);
            await addtoboostautopool(dummyusername);
            
            let transaction=await autopoolupdatehistory.create({

              Username:user_id,
              amount:10,
              updatedautopool:"boost"

            });
            await transaction.save();

          }
          
          else if(thisuser.boost_idx==-1 && packages===55)
          {  console.log("new")
            await addtoboostautopool(user_id);
          }
          
          else{
           return res.status(500).json({message:"wrong topup amount"})
            console.log("topup amount wrong")
            }
         
          
          if(depositeBalance<packages)
          {
            depositeBalance=0;
            totalIncome-=(packages-depositeBalance);
          }
          else{
            depositeBalance-=packages;
          }
  
          
         existingWallet.total_deposite=depositeBalance
         existingWallet.total_income=totalIncome;
  
         await existingWallet.save();
  
           return res.status(201).json(existingWallet);
  
        }
  
        else{
          
          res.status(400).json({message: "not sufficent amount available"});
          }
  
      }
      else{
        
        res.status(400).json({message: "invalid trx password "})
      }
  
    }
  
  }
  catch(err)
  {
    res.status(400).json({message: err})
      
  }
}

  //for tree structure
  const boostcallApi= async function (userid,autopool) {
      
    
   const childk=await boostautopool.findOne({Username:userid,level:1});
   if (childk)
    {return childk.child;}
 
}
let boostanswer=[];

async function boostgettreeautopool(req,res) {
  const allautopool=[]
  let op;
  
  const {user_id}=req.body;
const user=await User.findOne({user_id:user_id});
//console.log(User)
 
console.log(user_id)
  if(user.boost_idx!=-1){allautopool.push(await boosthelpgettreeautopool(user_id,1));}

  const dummy=await User.find({name:'dummy'});
  

  for(const v of dummy)
  {  
    let userid=v.user_id;
    console.log(userid)

    userid=userid.slice(9)
    if(userid===user_id)
    { 
      if(v.boost_idx!=-1){allautopool.push(await boosthelpgettreeautopool(v.user_id,1));}

    }
  }
  res.status(201).json(allautopool);
}

async function boosthelpgettreeautopool(userId,autopool) {
  const op=await boostgetMembersInGroup(userId,0,autopool);
  
  if(userId.slice(0,5)==='dummy')
{
userId=userId.slice(9);
}
  const data={
    name:userId,
    autopool:"boost",
    show:true,
    level:0,
    child:boostanswer

  }
  return data;
}

const boostgetMembersInGroup = async (userid,level,autopool) => {

let members=[];

members = await boostcallApi(userid,autopool) ?? [];

console.log(members)

let newmembers=[];

  for (let member of members) {
  
   const p= await boostgetMembersInGroup(member,level+1,autopool);
   //console.log(member,p);
    console.log(member);
   if(member.slice(0,5)=='dummy')
   {
    member=member.slice(9);
   }
   
   const ps={name:member,show:true,level:level+1,child:p};

   newmembers.push(ps);
              
  }

  if(newmembers.size>0) {return newmembers
  }
else{
  boostanswer=newmembers;
  //const ps={name:userid,show:true,level:1,child:[]};
  return newmembers;

}


}

//functions for tree autopool structure
  const callApi= async function (userid,autopool) {
      
    if(autopool==1)
   {const childk=await firstautopool.findOne({Username:userid,level:1});
   if (childk)
    {return childk.child;}
  
  }
   else  if(autopool==2)
   {const childk=await secondautopool.findOne({Username:userid,level:1});
   if (childk)
    {return childk.child;}
  
  }
  else  if(autopool==3)
   {const childk=await thirdautopool.findOne({Username:userid,level:1});
   if (childk)
    {return childk.child;}
  
  }
  else  if(autopool==4)
   {const childk=await fourthautopool.findOne({Username:userid,level:1});
   if (childk)
    {return childk.child;}
  
  }
  else  if(autopool==5)
   {const childk=await fifthautopool.findOne({Username:userid,level:1});
   if (childk)
    {return childk.child;}
  
  }
  else  if(autopool==6)
   {const childk=await VIautopool.findOne({Username:userid,level:1});
   if (childk)
    {return childk.child;}
  
  }
  else  if(autopool==7)
   {const childk=await VIIautopool.findOne({Username:userid,level:1});
   if (childk)
    {return childk.child;}
  
  }
  else  if(autopool==8)
  {const childk=await VIIIautopool.findOne({Username:userid,level:1});
  if (childk)
   {return childk.child;}
 
 }
 else  if(autopool==9)
   {const childk=await IXautopool.findOne({Username:userid,level:1});
   if (childk)
    {return childk.child;}
  
  }
  else  if(autopool=10)
   {const childk=await Xautopool.findOne({Username:userid,level:1});
   if (childk)
    {return childk.child;}
  
  }
  else  if(autopool==11)
   {const childk=await XIautopool.findOne({Username:userid,level:1});
   if (childk)
    {return childk.child;}
  
  }
  else  if(autopool==12)
   {const childk=await XIIautopool.findOne({Username:userid,level:1});
   if (childk)
    {return childk.child;}
  
  }
  else  if(autopool==13)
   {const childk=await XIIIautopool.findOne({Username:userid,level:1});
   if (childk)
    {return childk.child;}
  
  }else  if(autopool==14)
  {const childk=await XIVautopool.findOne({Username:userid,level:1});
  if (childk)
   {return childk.child;}
 
 }
 else  if(autopool==15)
   {const childk=await XVautopool.findOne({Username:userid,level:1});
   if (childk)
    {return childk.child;}
  
  }
  // else  if(autopool==2)
  //  {const childk=await secondautopool.findOne({Username:userid,level:1});
  //  if (childk)
  //   {return childk.child;}
  
  // }


  
   
    //console.log(childk);
    

  }



  
let answer=[];

async function gettreeautopool(req,res) {
  const allautopool=[]
  let op;
   const {user_id}=req.body;
   
const user=await User.findOne({user_id:user_id});
console.log(user)

  if(user.first_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,1));}
  if(user.second_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,2));}
  if(user.third_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,3));}
  if(user.fourth_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,4));}
  if(user.fifth_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,5));}
  if(user.VI_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,6));}

  if(user.VII_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,7));}

  if(user.VIII_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,8));}
  if(user.IX_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,9));}

  if(user.X_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,10));}

  if(user.XI_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,11));}

  if(user.XII_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,12));}


  if(user.XIII_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,13));}

  if(user.XIV_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,14));}

  if(user.XV_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,15));}
  if(user.XVI_idx!=-1){allautopool.push(await helpgettreeautopool(user_id,16));}

  res.status(200).json(allautopool);
}
async function helpgettreeautopool(userId,autopool) {
  const op=await getMembersInGroup(userId,0,autopool);
  //console.log("hhhhop",answer)
  
  const data={
    name:userId,
    autopool:autopool,
    show:true,
    level:0,
    child:answer

  }
  return data;
}

const getMembersInGroup = async (userid,level,autopool) => {

  

  let members=[];

members = await callApi(userid,autopool) ?? [];

console.log(members)

let newmembers=[];

  for (const member of members) {
  
   const p= await getMembersInGroup(member,level+1,autopool);
   //console.log(member,p);

   const ps={name:member,show:true,level:level+1,child:p};

   newmembers.push(ps);
          
      
  }

   
  if(newmembers.size>0) {return newmembers
  }
else{
  answer=newmembers;
  //const ps={name:userid,show:true,level:1,child:[]};
  return newmembers;

}
}


//for history of autopool transactions
const getautopoolchilddata=async(req,res)=>{
  let user_id=req.auth.id;
let data=await autopoolhistory.find({Username:user_id});
//console.log(data);
let ans=[];

//for level 1 child 
 const levelwise1=data.filter((d)=>{return d.level==1});
 let arr=[];
 levelwise1.forEach(element => {
  let pp={
    'name':element.child,
    'autopool':element.autopool,
    'level':element.level
  }
  arr.push(pp);
 });
 
 ans.push(arr);
 //for level 2 child

 const levelwise2=data.filter((d)=>{return d.level==2});
 arr=[];
 levelwise2.forEach(element => {
  let pp={
    'name':element.child,
    'autopool':element.autopool,
    'level':element.level
  }
  arr.push(pp);
 });
 
 ans.push(arr);




res.status(200).json(ans);

}
const getautopoolData = async(req, res)=>{
  const id = req.params.id;
  //console.log(id)
  const thatusername=await User.findOne({_id:id});
  //console.log(thatusername); 

  try{

  if(id){
      const firstdata = await firstautopool.find({Username: thatusername.user_id});
       const seconddata = await secondautopool.find({Username: thatusername.user_id});
       const thirddata = await thirdautopool.find({Username: thatusername.user_id});
       const fourthdata = await fourthautopool.find({Username: thatusername.user_id});
       const fifthdata = await fifthautopool.find({Username: thatusername.user_id});
       const VIdata = await VIautopool.find({Username: thatusername.user_id});
       const VIIdata = await VIIautopool.find({Username: thatusername.user_id});
       const VIIIdata = await VIIIautopool.find({Username: thatusername.user_id});
       const IXdata = await IXautopool.find({Username: thatusername.user_id});
       const Xdata = await Xautopool.find({Username: thatusername.user_id});
       const XIdata = await XIautopool.find({Username: thatusername.user_id});
       const XIIdata = await XIIautopool.find({Username: thatusername.user_id});
       const XIIIdata = await XIIIautopool.find({Username: thatusername.user_id});
       const XIVdata = await XIVautopool.find({Username: thatusername.user_id});
       const XVdata = await XVautopool.find({Username: thatusername.user_id});
       


  const data={
    'firstautopool':firstdata,
    'secondautopool':seconddata,
    'thirdautopool':thirddata,
    'fourthautopool':fourthdata,
     'fifthautopool':fifthdata,
     'VIautopool':VIdata,
     'VIIautopool':VIIdata,
     'VIIautopool':VIIdata,
     'VIIIautopool':VIIIdata,
     'IXautopool':IXdata,
     'Xautopool':Xdata,
     'XIautopool':XIdata,
     'XIIautopool':XIIdata,
     'XIIIautopool':XIIIdata,
     'XIVautopool':XIVdata,
     'XVautopool':XVdata,

  }
          res.status(200).json(data);
      }
  else{
      res.send("no id given",{});
  }
}
catch(e){
  res.status(400);
  throw new Error(" not found");
}

};









// Get refferalInfo
const getRefferalInfo = async (req, res) => {
  try {
    const userId = req.query.user_id;

  const user = await User.findOne({ user_id: userId });

  if (user) {
    res.status(200).json({
      name: user.name,
    });
  } else {
    res.status(400).send({
      message: "Invalid user ID",
    });
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
};

// Get user Information
const getUserInfo = async (req, res) => {
  try {
    // const userId = req.params.user_id;
    let userId = req.auth.id;

  const user = await User.findOne({ user_id: userId })
  const {password, ...userInfo} = user._doc;
  //.populate("team");

  if (userInfo) {
    res.status(200).json({
      data: userInfo,
    });
  } else {
    res.status(404).json({
      message: "Invalid user ID",
    });
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
};

// get level team
const getLevelTeam = async (req, res) => {
  try {
    // const user_id = req.params.user_id;
    const user_id = req.auth.id;

  if (user_id) {
    const levelTeam = await Level.findOne({ user_id: user_id }).populate({
      path: 'level.user',
      model: 'User',
      select: "topup_activation_date"
    });
    // const data = {}
    if (levelTeam) {
      res.status(200).json({
        name: levelTeam.name,
        user_id: levelTeam.user_id,
        email: levelTeam.email,
        sponsor_id: levelTeam.sponsor_id,
        level: levelTeam?.level.reverse(),
      });
    } else {
      res.status(400).json({
          message: "Cannot find any team",
      });
    }
  } else {
    res.status(400).json({
        message: "Cannot find User ID",
    });
  }
  } catch (error) {
    //console.log(error)
    res.status(400).json({
      message: error.toString()
    })
  }
};

// Update user Information
const updateUserInfo = async (req, res) => {
  try {
    const data = req.body;
    // const user = User.findOne(({user_id: data.user_id}));
    // if(user){
      const updatedUser = await User.updateOne({ user_id: data.user_id}, data);
      if (updatedUser) {
        res.status(200).json({
          message: "User information updated"
        });
      } else {
        res.status(400).json({
          message: "Cannot update user information",
        });
      }
    // }else{
    //   res.send({
    //     status: 400,
    //     message: "Cannot find user",
    //     error: 400,
    //   });
    // }
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      message: error.toString()
    })
  }
};

// change TRX password
const changeTrxPassword = async (req, res) => {
  try {
    const { current_trx_password, new_trx_password, otpCode } = req.body;
    const user_id = req.auth.id;
    if(!current_trx_password){
      res.status(400).json({
        message: "Current TRX password is missing"
      })
    }
    if(!new_trx_password){
      res.status(400).json({
        message: "New TRX password is missing"
      })
    }
    if(!otpCode){
      res.status(400).json({
        message: "OTP is missing"
      })
    }
    const user = await User.findOne({user_id: user_id});
      // check already have anaccount with this email or not
      const existingUser = await User.findOne({trx_password: new_trx_password});
      // check OTP
      const otp = await Otp.findOne({ email: user.email });
      if (parseFloat(otp?.code) === parseFloat(otpCode)) {
        if(!existingUser && user && user.trx_password === current_trx_password){
            const updateUser = await User.updateOne(
              { user_id: user_id },
              {
                $set: {
                  trx_password: new_trx_password,
                },
              }
            );
            if (updateUser) {
              res.status(200).json({
                message: "TRX Password changed successfully",
              });
            } else {
              res.status(400).json({
                message: "Cannot update TRX password",
              });
            }
          }else{
            res.status(400).json({
                message: "Invalid current Trx password",
            });
          }
      }else{
        res.status(400).json({
            message: "Invalid OTP",
        });
      }
  } catch (error) {
    //console.log(error)
    res.status(400).json({
      message: error.toString()
    })
  }
};

// change password
const changePassword = async (req, res) =>{
  try {
    const { current_password, new_password, otpCode} = req.body;
    const user_id = req.auth.id;
    if(!new_password){
      res.status(400).json({
          message: "New password is missing"
      })
    }
    if(!current_password){
      res.status(400).json({
          message: "Current password is missing"
      })
    }
    if(!otpCode){
      res.status(400).json({
          message: "OTP is missing"
      })
    }
    // find user
    const user = await User.findOne({user_id: user_id});
    if(user && (await user.matchPassword(current_password))){  
      // check OTP
      const otp = await Otp.findOne({ email: user.email });
      if (otp && parseFloat(otp?.code) === parseFloat(otpCode)) {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(new_password, salt);
        const changePassword = await User.findByIdAndUpdate({_id: user._id}, {
          $set: {
            password: encryptedPassword
          }
        })
        await changePassword.save();
        res.status(200).json({
            message: "Password change successfully"
        })
      }else{
        res.status(400).json({
            message: "Invalid OTP"
        })
      }
    }else{
      res.status(400).json({
          message: "Invalid Current Password"
      })
    }
  } catch (error) {
    //console.log(error)
    res.status(400).json({
      message: error.toString()
    })
  }
}

// update email
const updateEmail = async (req, res) => {
  try {
    if (!req.body.current_email) {
      res.status(400).json({
          message: "Field is required!",
      });
    } else {
      // let userId = req.auth.id;
      let post = req.body;
      const { current_email, new_email, otpCode } = post;
      const user_id = req.auth.id;
      const user = await User.findOne({user_id: user_id});
      // check already have anaccount with this email or not
      const existingUser = await User.findOne({email: new_email});
      // check OTP
      const otp = await Otp.findOne({ email: new_email });
      if (parseFloat(otp?.code) === parseFloat(otpCode)) {
        if(!existingUser && user && user.email === current_email){
          let updateEmail = await User.findOneAndUpdate(
            { user_id: user_id },
            {
              $set: {
                email: new_email
              },
            },
            { new: true }
          );
          res.status(200).json({
            message: "Email changed Successfully",
          });
        }else{
          res.status(400).json({
              message: "Invalid user ID or email",
          });
        }
      }else{
        res.status(404).json({
            message: "Invalid OTP",
        });
      }
    }
  } catch (e) {
    //console.log(e);
    res.status(400).json({
        message: e.toString(),
    });
  }
};

// deposite
const depositeAmount = async (req, res) => {
  try {
    const { user_id, amount, trx_password, hash } = req.body;

    if(!req.body) return res.status(400).json({
      message: "Please provide data",
    });
    if(!req.file?.path) res.status(400).json({
      message: "Proof image is missing",
    });
    if(!user_id) return res.status(400).json({
      message: "User Id is missing",
    });
    if(!amount) return res.status(400).json({
      message: "Amount is missing",
    });
    if(!trx_password) return res.status(400).json({
      message: "Trx password is missing",
    });

  // find user
  const user = await User.findOne({ user_id: user_id });

  const image = await Cloudinary.uploader.upload(req.file?.path);
    const avatar = {
      avatar: image.secure_url,
      avatar_public_url: image.public_id,
    };
    if (user && trx_password === user.trx_password) {
    // if (true) {

      // if(parseFloat(amount) >= 25){

        if(avatar){
          // find deposit

          const deposite_exist = await Deposite.findOne({ user_id: user.user_id });

          if (!deposite_exist) {

            const newDeposite = await Deposite.create({
              user: user._id,
              user_id: user.user_id,
              total_deposite: parseFloat(amount),
              last_deposite_amount: parseFloat(amount),
              history: [
                {
                  user_id: user.user_id,
                  name: user.name,
                  amount: parseFloat(amount),
                  status: "pending",
                  date: new Date().toDateString(),
                  transaction_id: generateString(15),
                  hash: hash,
                  proof_pic: avatar,
                  time: getIstTime(),
                },
              ],
            });

            // if (newDeposite) {
            //   // update wallet
            //   const wallet = await Wallet.findOne({ user_id: user.user_id });

            //   if (wallet) {

            //     const updatedDeposite = await Deposite.findOne({ user_id: user.user_id });

            //     const updateWallet = await Wallet.findByIdAndUpdate(
            //       { _id: wallet._id },
            //       {
            //         $set: {
            //           history: updatedDeposite._id,
            //         },
            //       }

            //       );
                  

            //     await updateWallet.save();

            //   } else {
            //     res.status(400).json({
            //         message: "Cannot find wallet",
            //     });
            //   }
            // }

            res.status(200).json({
              message: "Deposite request successfull",
            });

          } else {

            const updateDeposite = await Deposite.findByIdAndUpdate(

              { _id: deposite_exist._id },

              {
                $set: {
                  total_deposite: parseFloat(deposite_exist.total_deposite) + parseFloat(amount),
                  last_deposite_amount: parseFloat(amount),
                  date: new Date(),
                },
                $push: {
                  history: {
                    user_id: user.user_id,
                    name: user.name,
                    amount: parseFloat(amount),
                    status: "pending",
                    date: new Date().toDateString(),
                    transaction_id: generateString(15),
                    proof_pic: avatar,
                    hash: hash,
                    time: getIstTime(),
                  },
                },
              }
            );

            // await updateDeposite.save();
            // update wallet

            // const wallet = await Wallet.findOne({ user_id: user.user_id });
            // if (wallet) {
            //   const updateWallet = await Wallet.findByIdAndUpdate(
            //     { _id: wallet._id },
            //     {
            //       $set: {
            //         history: updateDeposite._id,
            //       },
            //     }
            //     );
              
            //   await updateWallet.save();
            // } else {
            //   res.status(400).json({
            //       message: "Cannot find wallet",
            //   });
            // }
            res.status(200).json({
              message: "Deposite request successfull",
            });
          }
        }else{
          res.status(400).json({
            message: "Cannot get proof image"
          })
        }
      // } 
      // else{
      //   res.status(400).json({
      //       message: "Minimum deposite amount is 30"
      //   })
      // }
    } else {
      res.status(400).json({
          message: "Invalid User ID or Transaction Password",
      });
    }
  } catch (error) {
    //console.log(error)
    res.status(400).json({
      message: error.toString()
    })
  }
};

// get deposite history
const depositeHistory = async (req, res) => {
  try {
    // const user_id = req.params.user_id;
    const user_id = req.auth.id;
  if (!user_id) {
    res.status(400);
    throw new Error("Data not found");
  }
  const depositeInfo = await Deposite.findOne({ user_id: user_id })
  // .populate(
  //   "user"
  // );
  if (depositeInfo) {
    res.status(200).json({
      user: depositeInfo.user,
      transaction_id: depositeInfo.transaction_id,
      history: depositeInfo.history.reverse(),
    });
  } else {
    res.status(400).json({
        message: "Cannot find deposite information",
    });
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
};









// make topup
const makeTopup = async (req, res) => {
  try {
    console.log(req.auth);
    // const {name, email, username, sponsor_id, position, amount } = req.body;
  const { user_id, packages, trx_password } = req.body;
  const userId = req.auth.id;
  // find user
  // if user ID is not there then send error
  if (!user_id) {
    res.status(400).json({message: "User id is missing"})
  }else if(!packages){
    res.status(400).json({message: "Package is missing"})
  }else if(user_id !== userId){
    res.status(400).json({message: "Invalid user id"})
  }else{

    const user = await User.findOne({ user_id: user_id });

    const existingWallet = await Wallet.findOne({ user_id: user.user_id });
  if(trx_password === user.trx_password){
    // if (true) {
      if(!user?.topup_status){
        const depositeBalance = parseFloat(existingWallet.total_deposite);
        const totalIncome = parseFloat(existingWallet.total_income);
        //
        //here deposit balance + total income sums upto present amount of user 
  
        //console.log(depositeBalance,totalIncome)
        if(depositeBalance >= parseFloat(packages)){
          
      // topup is possible s doing topup now
          // find existing Topup
          const existingTopup = await Topup.findOne({ user_id: user_id });//if user have done any previous topup
          
  
          //UPDATING WALLET FOR BOTH CASE IF IT IS THERE FIRST TOPUP OR NOT
  
          if (existingTopup) {
            //if user have done any previous topup
            // Calculate current amount
            const date = new Date().toDateString();
            const status = "success";
            const updatedTopup = await Topup.findOneAndUpdate(
              { user_id: existingTopup?.user_id },
              {
                $set: {
                  // user: user._id,
                  // packages: packages,
                  // status: status,
                  history: [
                    ...existingTopup.history,
                    {
                      user_id: user_id,
                      packages: packages,
                      status: status,
                      date: date,
                      transaction_id: generateString(15),
                      time: getIstTime(),
                    },
                  ],
                },
              }
              );
  
              // await updatedTopup.save();
  
              // Update Wallet
              if (existingWallet) {
  
                const topup = await Topup.findOne({ user_id: user.user_id });
                if(depositeBalance >= parseFloat(packages)){
                  const updateWallet = await Wallet.findOneAndUpdate(
                    { user_id: user.user_id },
                    {
                      $set: {
                        total_deposite: parseFloat(existingWallet.total_deposite) - parseFloat(packages),
                      },
                    }
                    );
                    // topupable_balance:
                    //   parseFloat(existingWallet.topupable_balance) - parseFloat(packages),
                    // withdrawable_balance: parseFloat(existingWallet.withdrawable_balance) >= 0 && parseFloat(existingWallet.withdrawable_balance) - parseFloat(packages),
                }
                // if(depositeBalance <= parseFloat(packages) && (totalIncome + depositeBalance) >= parseFloat(packages)){
                //   const updateWallet = await Wallet.findOneAndUpdate(
                //     { user_id: user.user_id },
                //     {
                //       $set: {
                //         total_deposite: 0,
                //         total_income: ((parseFloat(existingWallet.total_income) + parseFloat(existingWallet.total_deposite)) - (parseFloat(packages))),
                //       },
                //     }
                //     );
                //     // topupable_balance:
                //     //   parseFloat(existingWallet.topupable_balance) - parseFloat(packages),
                //     // withdrawable_balance: parseFloat(existingWallet.withdrawable_balance) >= 0 && parseFloat(existingWallet.withdrawable_balance) - parseFloat(packages),
                // }
            } else {
              res.status(400).json({
                  message: "Cannot update Wallet",
              });
            }
            // // update reward income
      
            // update user status
            const updatedUser = await User.updateOne(
              { _id: user._id },
              {
                $set: {
                  topup_status: true,
                  active_package: packages,
                },
              }
            );
  
            // update direct or indirect income
            const level1 = await User.findOne({ user_id: user.sponsor_id });
            const level2 = await User.findOne({ user_id: level1?.sponsor_id });
            const level3 = await User.findOne({ user_id: level2?.sponsor_id });
            const level4 = await User.findOne({ user_id: level3?.sponsor_id });
            const level5 = await User.findOne({ user_id: level4?.sponsor_id });
            const level6 = await User.findOne({ user_id: level5?.sponsor_id });
            const level7 = await User.findOne({ user_id: level6?.sponsor_id });
            const level8 = await User.findOne({ user_id: level7?.sponsor_id });
            
            // Update Level 1
            if (level1 && level1?.topup_status) {
              // update sponsor's dirrect income
              await LevelIncome.create({
                name: level1?.name,
                user_id: level1?.user_id,
                email: level1?.email,
                sponsor_id: level1?.sponsor_id,
                transaction_id: generateString(),
                amount: 20,
                type: "Direct",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level1?.user_id
              },{
                $inc: {
                  direct_income: +20,
                  total_income: +20,
                }
              })
            }
            // update level 2
            if (level2 && level2?.topup_status) {
              // update sponsor's indirrect income
              await LevelIncome.create({
                name: level2?.name,
                user_id: level2?.user_id,
                email: level2?.email,
                sponsor_id: level2?.sponsor_id,
                transaction_id: generateString(),
                amount: 2,
                type: "Indirect",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level2?.user_id
              },{
                $inc: {
                  indirect_income: +2,
                  total_income: +2,
                }
              })
            }
            
            // update level 3
            if (level3 && level3?.topup_status) {
              // update sponsor's indirrect income
              await LevelIncome.create({
                name: level3?.name,
                user_id: level3?.user_id,
                email: level3?.email,
                sponsor_id: level3?.sponsor_id,
                transaction_id: generateString(),
                amount: 2,
                type: "Indirect",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level3?.user_id
              },{
                $inc: {
                  indirect_income: +2,
                  total_income: +2,
                }
              })
            }
            // update level 4
            if (level4 && level4?.topup_status) {
              // update sponsor's indirrect income
              await LevelIncome.create({
                name: level4?.name,
                user_id: level4?.user_id,
                email: level4?.email,
                sponsor_id: level4?.sponsor_id,
                transaction_id: generateString(),
                amount: 2,
                type: "Indirect",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level4?.user_id
              },{
                $inc: {
                  indirect_income: +2,
                  total_income: +2,
                }
              })
            }
            // update level 5
            if (level5 && level5?.topup_status) {
              // update sponsor's indirrect income
              await LevelIncome.create({
                name: level5?.name,
                user_id: level5?.user_id,
                email: level5?.email,
                sponsor_id: level5?.sponsor_id,
                transaction_id: generateString(),
                amount: 1,
                type: "Indirect",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level5?.user_id
              },{
                $inc: {
                  indirect_income: +1,
                  total_income: +1,
                }
              })
            }
            // Update Level 6
            if (level6 && level6?.topup_status) {
              // update sponsor's indirrect income
              await LevelIncome.create({
                name: level6?.name,
                user_id: level6?.user_id,
                email: level6?.email,
                sponsor_id: level6?.sponsor_id,
                transaction_id: generateString(),
                amount: 1,
                type: "Indirect",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level6?.user_id
              },{
                $inc: {
                  indirect_income: +1,
                  total_income: +1,
                }
              })
            }
            // update level 7
            if (level7 && level7?.topup_status) {
              // update sponsor's indirrect income
              await LevelIncome.create({
                name: level7?.name,
                user_id: level7?.user_id,
                email: level7?.email,
                sponsor_id: level7?.sponsor_id,
                transaction_id: generateString(),
                amount: 1,
                type: "Indirect",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level7?.user_id
              },{
                $inc: {
                  indirect_income: +1,
                  total_income: +1,
                }
              })
            }
            // update level 8
            if (level8 && level8?.topup_status) {
              // update sponsor's indirrect income
              await LevelIncome.create({
                name: level8?.name,
                user_id: level8?.user_id,
                email: level8?.email,
                sponsor_id: level8?.sponsor_id,
                transaction_id: generateString(),
                amount: 1,
                type: "Indirect",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level8?.user_id
              },{
                $inc: {
                  indirect_income: +1,
                  total_income: +1,
                }
              })
            }
            res.status(200).json({
              message: "Topup Successfull",
            });
          } else {
            //if user have not done any previous topup
            const topup = await Topup.create({
              user: user._id,
              user_id: user_id,
              packages: packages,
              status: "success",
              date: new Date().toDateString(),
              history: [
                {
                  user_id: user_id,
                  packages: packages,
                  status: "success",
                  date: new Date().toDateString(),
                  transaction_id: generateString(15),
                  time: getIstTime(),
                },
              ],
            });
            // update user status
            const updatedUser = await User.updateOne(
              { _id: user._id },
              {
                $set: {
                  topup_status: true,
                  activation_date: new Date().getMilliseconds(),
                  topup_activation_date: new Date().toDateString(),
                  active_package: packages,
                },
              }
            );
            // update direct or indirect income
            const level1 = await User.findOne({ user_id: user.sponsor_id });
            const level2 = await User.findOne({ user_id: level1?.sponsor_id });
            const level3 = await User.findOne({ user_id: level2?.sponsor_id });
            const level4 = await User.findOne({ user_id: level3?.sponsor_id });
            const level5 = await User.findOne({ user_id: level4?.sponsor_id });
            const level6 = await User.findOne({ user_id: level5?.sponsor_id });
            const level7 = await User.findOne({ user_id: level6?.sponsor_id });
            const level8 = await User.findOne({ user_id: level7?.sponsor_id });
            
            // Update Level 1
            if (level1 && level1?.topup_status) {
              // update sponsor's dirrect income
              await LevelIncome.create({
                name: level1?.name,
                user_id: level1?.user_id,
                email: level1?.email,
                sponsor_id: level1?.sponsor_id,
                transaction_id: generateString(),
                amount: 20,
                type: "Direct",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level1?.user_id
              },{
                $inc: {
                  direct_income: +20,
                  total_income: +20,
                }
              })
            }
            // update level 2
            if (level2 && level2?.topup_status) {
              // update sponsor's indirrect income
              await LevelIncome.create({
                name: level2?.name,
                user_id: level2?.user_id,
                email: level2?.email,
                sponsor_id: level2?.sponsor_id,
                transaction_id: generateString(),
                amount: 2,
                type: "Indirect",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level2?.user_id
              },{
                $inc: {
                  indirect_income: +2,
                  total_income: +2,
                }
              })
            }
            
            // update level 3
            if (level3 && level3?.topup_status) {
              // update sponsor's indirrect income
              await LevelIncome.create({
                name: level3?.name,
                user_id: level3?.user_id,
                email: level3?.email,
                sponsor_id: level3?.sponsor_id,
                transaction_id: generateString(),
                amount: 2,
                type: "Indirect",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level3?.user_id
              },{
                $inc: {
                  indirect_income: +2,
                  total_income: +2,
                }
              })
            }
            // update level 4
            if (level4 && level4?.topup_status) {
              // update sponsor's indirrect income
              await LevelIncome.create({
                name: level4?.name,
                user_id: level4?.user_id,
                email: level4?.email,
                sponsor_id: level4?.sponsor_id,
                transaction_id: generateString(),
                amount: 2,
                type: "Indirect",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level4?.user_id
              },{
                $inc: {
                  indirect_income: +2,
                  total_income: +2,
                }
              })
            }
            // update level 5
            if (level5 && level5?.topup_status) {
              // update sponsor's indirrect income
              await LevelIncome.create({
                name: level5?.name,
                user_id: level5?.user_id,
                email: level5?.email,
                sponsor_id: level5?.sponsor_id,
                transaction_id: generateString(),
                amount: 1,
                type: "Indirect",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level5?.user_id
              },{
                $inc: {
                  indirect_income: +1,
                  total_income: +1,
                }
              })
            }
            // Update Level 6
            if (level6 && level6?.topup_status) {
              // update sponsor's indirrect income
              await LevelIncome.create({
                name: level6?.name,
                user_id: level6?.user_id,
                email: level6?.email,
                sponsor_id: level6?.sponsor_id,
                transaction_id: generateString(),
                amount: 1,
                type: "Indirect",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level6?.user_id
              },{
                $inc: {
                  indirect_income: +1,
                  total_income: +1,
                }
              })
            }
            // update level 7
            if (level7 && level7?.topup_status) {
              // update sponsor's indirrect income
              await LevelIncome.create({
                name: level7?.name,
                user_id: level7?.user_id,
                email: level7?.email,
                sponsor_id: level7?.sponsor_id,
                transaction_id: generateString(),
                amount: 1,
                type: "Indirect",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level7?.user_id
              },{
                $inc: {
                  indirect_income: +1,
                  total_income: +1,
                }
              })
            }
            // update level 8
            if (level8 && level8?.topup_status) {
              // update sponsor's indirrect income
              await LevelIncome.create({
                name: level8?.name,
                user_id: level8?.user_id,
                email: level8?.email,
                sponsor_id: level8?.sponsor_id,
                transaction_id: generateString(),
                amount: 1,
                type: "Indirect",
                income_from: user.user_id,
              })
              await Wallet.findOneAndUpdate({
                user_id: level8?.user_id
              },{
                $inc: {
                  indirect_income: +1,
                  total_income: +1,
                }
              })
            }
            if (topup) {
              // Update Wallet
              if (existingWallet) {
  
                const topup = await Topup.findOne({ user_id: user.user_id });
                if(depositeBalance >= parseFloat(packages)){
                  const updateWallet = await Wallet.findOneAndUpdate(
                    { user_id: user.user_id },
                    {
                      $set: {
                        total_deposite: parseFloat(existingWallet.total_deposite) - parseFloat(packages),
                      },
                    }
                    );
                    // topupable_balance:
                    //   parseFloat(existingWallet.topupable_balance) - parseFloat(packages),
                    // withdrawable_balance: parseFloat(existingWallet.withdrawable_balance) >= 0 && parseFloat(existingWallet.withdrawable_balance) - parseFloat(packages),
                }
                // if(depositeBalance <= parseFloat(packages) && (totalIncome + depositeBalance) >= parseFloat(packages)){
                //   const updateWallet = await Wallet.findOneAndUpdate(
                //     { user_id: user.user_id },
                //     {
                //       $set: {
                //         total_deposite: 0,
                //         total_income: ((parseFloat(existingWallet.total_income) + parseFloat(existingWallet.total_deposite)) - (parseFloat(packages))),
                //       },
                //     }
                //     );
                //     // topupable_balance:
                //     //   parseFloat(existingWallet.topupable_balance) - parseFloat(packages),
                //     // withdrawable_balance: parseFloat(existingWallet.withdrawable_balance) >= 0 && parseFloat(existingWallet.withdrawable_balance) - parseFloat(packages),
                //   }
              } else {
                res.status(400).json({
                  status: 400,
                  error: {
                    message: "Cannot update Wallet",
                  },
                });
              }
              res.status(200).json({
                message: "Topup successfull"
              });
            } else {
              res.status(400).send({
                message: "Cannot make topup",
              });
            }
          }
           // update autopool
      //1> first autopool
         
       
        //user\
  
        //update first autopool
        // if(autopoolcontrol===true)
        // {addtofirstautopool(user_id);}
        
    
    
    
      
    
  
  
        }else{
          res.status(400).json({
            message: "Insufficient balance"
          })
        }
      }else{
        res.status(400).json({
          message: "Your account is already activated!",
        });
      }
    } else {
      res.status(400).json({
          message: "Invalid Transaction Password",
      });
    }

  }
  } catch (error) {
    //console.log(error)
    res.status(400).json({
      message: error.toString()
    })
  }
};

// make User Activation
const UserActivation = async (req, res) => {
  try {
    console.log(req.auth);
    // const {name, email, username, sponsor_id, position, amount } = req.body;
    const { user_id, packages, trx_password } = req.body;
    const userId = req.auth.id;
    // find user
    // if user ID is not there then send error
    if (!user_id) {
      res.status(400).json({message: "Please enter user id"})
    }else if (!packages) {
      res.status(400).json({message: "Please select package"})
    }else if (!trx_password) {
      res.status(400).json({message: "Please enter trx password"})
    }else{
      const user = await User.findOne({ user_id: userId });
      const targetedUser = await User.findOne({user_id: user_id});
      const targetedSponsor = await User.findOne({user_id: user?.sponsor_id});
      const existingWallet = await Wallet.findOne({ user_id: user.user_id });
      if(user){
        const depositeBalance = parseFloat(existingWallet.total_deposite);
        const totalIncome = parseFloat(existingWallet.total_income);
        // console.log(depositeBalance + totalIncome)
        // console.log(parseFloat(packages)+ (parseFloat(packages)*10/100))
        if(user.topup_status){
          if(trx_password === user.trx_password){
            if(targetedUser){
              if(!targetedUser.topup_status){
                if((depositeBalance + totalIncome) >= (parseFloat(packages)+ (parseFloat(packages)*10/100))){
                  // find existing Topup
                  const existingTopup = await Topup.findOne({ user_id: user_id });//if user have done any previous topup
                  //UPDATING WALLET FOR BOTH CASE IF IT IS THERE FIRST TOPUP OR NOT
        
                  if (existingTopup) {
                    //if user have done any previous topup
                    // Calculate current amount
                    const date = new Date().toDateString();
                    const status = "success";
                    const updatedTopup = await Topup.findOneAndUpdate(
                      { user_id: existingTopup?.user_id },
                      {
                        $set: {
                                history: [
                                  ...existingTopup.history,
                                  {
                                    user_id: user_id,
                                    packages: packages,
                                    status: status,
                                    date: date,
                                    transaction_id: generateString(15),
                                    time: getIstTime(),
                                  },
                                ],
                              },
                        }
                      );
        
        
                    // Update Wallet
                    if (existingWallet) {
                      const topup = await Topup.findOne({ user_id: user.user_id });
                      if(depositeBalance >= (parseFloat(packages)+ (parseFloat(packages)*10/100))){
                        const updateWallet = await Wallet.findOneAndUpdate(
                          { user_id: userId },
                          {
                            $set: {
                              total_deposite: parseFloat(existingWallet.total_deposite) - (parseFloat(packages)+ (parseFloat(packages)*10/100)),
                            },
                          }
                          );
                        // update sponsor and admin wallet
                        await Wallet.findOneAndUpdate({user_id: targetedSponsor?.user_id},{
                          $inc: {
                            user_activation_income: +(parseFloat(packages)*5/100),
                            total_income: +(parseFloat(packages)*5/100),
                          }
                        })
                        await UserActivationIncome.create({
                          name: user?.name,
                          user_id: user?.user_id,
                          transaction_id: generateString(),
                          amount: (parseFloat(packages)*5/100),
                          type: "User Activation Income",
                          income_from: user_id,
                        })
                        // await Wallet.findOneAndUpdate({user_id: "ADMIN"},{
                        //   $inc: {
                        //     user_activation_income: +(parseFloat(packages)*5/100),
                        //     total_income: +(parseFloat(packages)*5/100),
                        //   }
                        // })
                        // await UserActivationIncome.create({
                        //   name: "ADMIN",
                        //   user_id: "ADMIN",
                        //   transaction_id: generateString(),
                        //   amount: (parseFloat(packages)*5/100),
                        //   type: "User Activation Income",
                        //   income_from: user_id,
                        // })
                      }
                      if(depositeBalance <= (parseFloat(packages)+ (parseFloat(packages)*10/100)) && (totalIncome + depositeBalance) >= (parseFloat(packages)+ (parseFloat(packages)*10/100))){
                        const updateWallet = await Wallet.findOneAndUpdate(
                          { user_id: user.user_id },
                          {
                            $set: {
                              total_deposite: 0,
                              total_income: ((parseFloat(existingWallet.total_income) + parseFloat(existingWallet.total_deposite)) - (parseFloat(packages)+ (parseFloat(packages)*10/100))),
                            },
                          }
                          );
                          // update sponsor and admin wallet
                        if(targetedSponsor && targetedSponsor?.topup_status){
                          await Wallet.findOneAndUpdate({user_id: targetedSponsor?.user_id},{
                            $inc: {
                              user_activation_income: +(parseFloat(packages)*5/100),
                              total_income: +(parseFloat(packages)*5/100),
                            }
                          })
                          await UserActivationIncome.create({
                            name: user?.name,
                            user_id: user?.user_id,
                            transaction_id: generateString(),
                            amount: (parseFloat(packages)*5/100),
                            type: "User Activation Income",
                            income_from: user_id,
                          })
                        }
                        // await Wallet.findOneAndUpdate({user_id: "ADMIN"},{
                        //   $inc: {
                        //     user_activation_income: +(parseFloat(packages)*10/100),
                        //     total_income: +(parseFloat(packages)*10/100),
                        //   }
                        // })
                        // await UserActivationIncome.create({
                        //   name: "ADMIN",
                        //   user_id: "ADMIN",
                        //   transaction_id: generateString(),
                        //   amount: (parseFloat(packages)*10/100),
                        //   type: "User Activation Income",
                        //   income_from: user_id,
                        // })
                      }
                    } else {
                        res.status(400).json({
                            message: "Cannot update Wallet",
                        });
                      }
            
                    // update user status
                    const updatedUser = await User.updateOne(
                      { _id: targetedUser._id },
                      {
                        $set: {
                          topup_status: true,
                          active_package: packages,
                        },
                      }
                    );
                    // update direct or indirect income
                    const level1 = await User.findOne({ user_id: targetedUser?.sponsor_id });
                    const level2 = await User.findOne({ user_id: level1?.sponsor_id });
                    const level3 = await User.findOne({ user_id: level2?.sponsor_id });
                    const level4 = await User.findOne({ user_id: level3?.sponsor_id });
                    const level5 = await User.findOne({ user_id: level4?.sponsor_id });
                    const level6 = await User.findOne({ user_id: level5?.sponsor_id });
                    const level7 = await User.findOne({ user_id: level6?.sponsor_id });
                    const level8 = await User.findOne({ user_id: level7?.sponsor_id });
                    
                    // Update Level 1
                    if (level1 && level1?.topup_status) {
                      // update sponsor's dirrect income
                      await LevelIncome.create({
                        name: level1?.name,
                        user_id: level1?.user_id,
                        email: level1?.email,
                        sponsor_id: level1?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 20,
                        type: "Direct",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level1?.user_id
                      },{
                        $inc: {
                          direct_income: +20,
                          total_income: +20,
                        }
                      })
                    }
                    // update level 2
                    if (level2 && level2?.topup_status) {
                      // update sponsor's indirrect income
                      await LevelIncome.create({
                        name: level2?.name,
                        user_id: level2?.user_id,
                        email: level2?.email,
                        sponsor_id: level2?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 2,
                        type: "Indirect",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level2?.user_id
                      },{
                        $inc: {
                          indirect_income: +2,
                          total_income: +2,
                        }
                      })
                    }
                    
                    // update level 3
                    if (level3 && level3?.topup_status) {
                      // update sponsor's indirrect income
                      await LevelIncome.create({
                        name: level3?.name,
                        user_id: level3?.user_id,
                        email: level3?.email,
                        sponsor_id: level3?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 2,
                        type: "Indirect",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level3?.user_id
                      },{
                        $inc: {
                          indirect_income: +2,
                          total_income: +2,
                        }
                      })
                    }
                    // update level 4
                    if (level4 && level4?.topup_status) {
                      // update sponsor's indirrect income
                      await LevelIncome.create({
                        name: level4?.name,
                        user_id: level4?.user_id,
                        email: level4?.email,
                        sponsor_id: level4?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 2,
                        type: "Indirect",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level4?.user_id
                      },{
                        $inc: {
                          indirect_income: +2,
                          total_income: +2,
                        }
                      })
                    }
                    // update level 5
                    if (level5 && level5?.topup_status) {
                      // update sponsor's indirrect income
                      await LevelIncome.create({
                        name: level5?.name,
                        user_id: level5?.user_id,
                        email: level5?.email,
                        sponsor_id: level5?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 1,
                        type: "Indirect",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level5?.user_id
                      },{
                        $inc: {
                          indirect_income: +1,
                          total_income: +1,
                        }
                      })
                    }
                    // Update Level 6
                    if (level6 && level6?.topup_status) {
                      // update sponsor's indirrect income
                      await LevelIncome.create({
                        name: level6?.name,
                        user_id: level6?.user_id,
                        email: level6?.email,
                        sponsor_id: level6?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 1,
                        type: "Indirect",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level6?.user_id
                      },{
                        $inc: {
                          indirect_income: +1,
                          total_income: +1,
                        }
                      })
                    }
                    // update level 7
                    if (level7 && level7?.topup_status) {
                      // update sponsor's indirrect income
                      await LevelIncome.create({
                        name: level7?.name,
                        user_id: level7?.user_id,
                        email: level7?.email,
                        sponsor_id: level7?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 1,
                        type: "Indirect",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level7?.user_id
                      },{
                        $inc: {
                          indirect_income: +1,
                          total_income: +1,
                        }
                      })
                    }
                    // update level 8
                    if (level8 && level8?.topup_status) {
                      // update sponsor's indirrect income
                      await LevelIncome.create({
                        name: level8?.name,
                        user_id: level8?.user_id,
                        email: level8?.email,
                        sponsor_id: level8?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 1,
                        type: "Indirect",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level8?.user_id
                      },{
                        $inc: {
                          indirect_income: +1,
                          total_income: +1,
                        }
                      })
                    }
                    res.status(200).json({
                      message: "Topup Successfull",
                    });
                  } else {
                    //if user have not done any previous topup
                    const topup = await Topup.create({
                      user: targetedUser._id,
                      user_id: user_id,
                      packages: packages - ((packages*10)/100),
                      status: "success",
                      date: new Date().toDateString(),
                      history: [
                        {
                          user_id: user_id,
                          packages: packages,
                          status: "success",
                          date: new Date().toDateString(),
                          transaction_id: generateString(15),
                          time: getIstTime(),
                        },
                      ],
                    });
                    // update user status
                    const updatedUser = await User.updateOne(
                      { _id: targetedUser._id },
                      {
                        $set: {
                          topup_status: true,
                          activation_date: new Date().getMilliseconds(),
                          topup_activation_date: new Date().toDateString(),
                          active_package: packages,
                        },
                      }
                    );
                    if (topup) {
                      // Update Wallet
                      if (existingWallet) {
        
                        const topup = await Topup.findOne({ user_id: user.user_id });
                        if(depositeBalance >= (parseFloat(packages)+ (parseFloat(packages)*10/100))){
                          const updateWallet = await Wallet.findOneAndUpdate(
                            { user_id: userId },
                            {
                              $set: {
                                total_deposite: parseFloat(existingWallet.total_deposite) - (parseFloat(packages)+ (parseFloat(packages)*10/100)),
                              },
                            }
                            );
                            // update direct or indirect income
                    const level1 = await User.findOne({ user_id: targetedUser?.sponsor_id });
                    const level2 = await User.findOne({ user_id: level1?.sponsor_id });
                    const level3 = await User.findOne({ user_id: level2?.sponsor_id });
                    const level4 = await User.findOne({ user_id: level3?.sponsor_id });
                    const level5 = await User.findOne({ user_id: level4?.sponsor_id });
                    const level6 = await User.findOne({ user_id: level5?.sponsor_id });
                    const level7 = await User.findOne({ user_id: level6?.sponsor_id });
                    const level8 = await User.findOne({ user_id: level7?.sponsor_id });
                    
                    // Update Level 1
                    if (level1 && level1?.topup_status) {
                      // update sponsor's dirrect income
                      await LevelIncome.create({
                        name: level1?.name,
                        user_id: level1?.user_id,
                        email: level1?.email,
                        sponsor_id: level1?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 20,
                        type: "Direct",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level1?.user_id
                      },{
                        $inc: {
                          direct_income: +20,
                          total_income: +20,
                        }
                      })
                    }
                    // update level 2
                    if (level2 && level2?.topup_status) {
                      // update sponsor's indirrect income
                      await LevelIncome.create({
                        name: level2?.name,
                        user_id: level2?.user_id,
                        email: level2?.email,
                        sponsor_id: level2?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 2,
                        type: "Indirect",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level2?.user_id
                      },{
                        $inc: {
                          indirect_income: +2,
                          total_income: +2,
                        }
                      })
                    }
                    
                    // update level 3
                    if (level3 && level3?.topup_status) {
                      // update sponsor's indirrect income
                      await LevelIncome.create({
                        name: level3?.name,
                        user_id: level3?.user_id,
                        email: level3?.email,
                        sponsor_id: level3?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 2,
                        type: "Indirect",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level3?.user_id
                      },{
                        $inc: {
                          indirect_income: +2,
                          total_income: +2,
                        }
                      })
                    }
                    // update level 4
                    if (level4 && level4?.topup_status) {
                      // update sponsor's indirrect income
                      await LevelIncome.create({
                        name: level4?.name,
                        user_id: level4?.user_id,
                        email: level4?.email,
                        sponsor_id: level4?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 2,
                        type: "Indirect",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level4?.user_id
                      },{
                        $inc: {
                          indirect_income: +2,
                          total_income: +2,
                        }
                      })
                    }
                    // update level 5
                    if (level5 && level5?.topup_status) {
                      // update sponsor's indirrect income
                      await LevelIncome.create({
                        name: level5?.name,
                        user_id: level5?.user_id,
                        email: level5?.email,
                        sponsor_id: level5?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 1,
                        type: "Indirect",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level5?.user_id
                      },{
                        $inc: {
                          indirect_income: +1,
                          total_income: +1,
                        }
                      })
                    }
                    // Update Level 6
                    if (level6 && level6?.topup_status) {
                      // update sponsor's indirrect income
                      await LevelIncome.create({
                        name: level6?.name,
                        user_id: level6?.user_id,
                        email: level6?.email,
                        sponsor_id: level6?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 1,
                        type: "Indirect",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level6?.user_id
                      },{
                        $inc: {
                          indirect_income: +1,
                          total_income: +1,
                        }
                      })
                    }
                    // update level 7
                    if (level7 && level7?.topup_status) {
                      // update sponsor's indirrect income
                      await LevelIncome.create({
                        name: level7?.name,
                        user_id: level7?.user_id,
                        email: level7?.email,
                        sponsor_id: level7?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 1,
                        type: "Indirect",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level7?.user_id
                      },{
                        $inc: {
                          indirect_income: +1,
                          total_income: +1,
                        }
                      })
                    }
                    // update level 8
                    if (level8 && level8?.topup_status) {
                      // update sponsor's indirrect income
                      await LevelIncome.create({
                        name: level8?.name,
                        user_id: level8?.user_id,
                        email: level8?.email,
                        sponsor_id: level8?.sponsor_id,
                        transaction_id: generateString(),
                        amount: 1,
                        type: "Indirect",
                        income_from: user.user_id,
                      })
                      await Wallet.findOneAndUpdate({
                        user_id: level8?.user_id
                      },{
                        $inc: {
                          indirect_income: +1,
                          total_income: +1,
                        }
                      })
                    }
                            // update sponsor and admin wallet
                          if(targetedSponsor && targetedSponsor?.topup_status){
                            await Wallet.findOneAndUpdate({user_id: targetedSponsor?.user_id},{
                              $inc: {
                                user_activation_income: +(parseFloat(packages)*5/100),
                                total_income: +(parseFloat(packages)*5/100),
                              }
                            })
                            await UserActivationIncome.create({
                              name: user?.name,
                              user_id: user?.user_id,
                              transaction_id: generateString(),
                              amount: (parseFloat(packages)*5/100),
                              type: "User Activation Income",
                              income_from: user_id,
                            })
                          }
                          // await Wallet.findOneAndUpdate({user_id: "ADMIN"},{
                          //   $inc: {
                          //     user_activation_income: +(parseFloat(packages)*10/100),
                          //     total_income: +(parseFloat(packages)*10/100),
                          //   }
                          // })
                          // await UserActivationIncome.create({
                          //   name: "ADMIN",
                          //   user_id: "ADMIN",
                          //   transaction_id: generateString(),
                          //   amount: (parseFloat(packages)*10/100),
                          //   type: "User Activation Income",
                          //   income_from: user_id,
                          // })
                        }
                        if(depositeBalance <= (parseFloat(packages)+ (parseFloat(packages)*10/100)) && (totalIncome + depositeBalance) >= (parseFloat(packages)+ (parseFloat(packages)*10/100))){
                          const updateWallet = await Wallet.findOneAndUpdate(
                            { user_id: userId },
                            {
                              $set: {
                                total_deposite: 0,
                                total_income: ((parseFloat(existingWallet.total_income) + parseFloat(existingWallet.total_deposite)) - (parseFloat(packages)+ (parseFloat(packages)*10/100))),
                              },
                            }
                            );
                            // update sponsor and admin wallet
                          await Wallet.findOneAndUpdate({user_id: targetedSponsor?.user_id},{
                            $inc: {
                              user_activation_income: +(parseFloat(packages)*5/100),
                              total_income: +(parseFloat(packages)*5/100),
                            }
                          })
                          await UserActivationIncome.create({
                            name: user?.name,
                            user_id: user?.user_id,
                            transaction_id: generateString(),
                            amount: (parseFloat(packages)*5/100),
                            type: "User Activation Income",
                            income_from: user_id,
                          })
                          // await Wallet.findOneAndUpdate({user_id: "ADMIN"},{
                          //   $inc: {
                          //     user_activation_income: +(parseFloat(packages)*5/100),
                          //     total_income: +(parseFloat(packages)*5/100),
                          //   }
                          // })
                          // await UserActivationIncome.create({
                          //   name: "ADMIN",
                          //   user_id: "ADMIN",
                          //   transaction_id: generateString(),
                          //   amount: (parseFloat(packages)*5/100),
                          //   type: "User Activation Income",
                          //   income_from: user_id,
                          // })
                        }
                      } else {
                        res.status(400).json({
                          status: 400,
                          error: {
                            message: "Cannot update Wallet",
                          },
                        });
                      }
                      res.status(200).json({
                        message: "Topup successfull"
                      });
                    } else {
                      res.status(400).send({
                        message: "Cannot make topup",
                      });
                    }
                  }
                  // if(autopoolcontrol===true){
                  //   addtofirstautopool(user_id);
                  // }
                }else{
                  res.status(400).json({
                    message: "Insufficient balance"
                  })
                }
              }else{
                res.status(400).json({
                  message: "This user's account is already activated."
                })
              }
            }else{
              res.status(400).json({
                message: "Invalid user id."
              })
            }
          }else{
            res.status(400).json({
              message: "Invalid TRX password."
            })
          }
        }else{
          res.status(400).json({
            message: "Your account is not activated yet."
          })
        }
      } else {
      res.status(400).json({
          message: "Unauthorized action",
      });
    }

  }
  } catch (error) {
    //console.log(error)
    res.status(400).json({
      message: error.toString()
    })
  }
};


//autopooltopup

const autopooltopup=async(req,res)=>{
  
  
  if(autopoolcontrol===false){
    return res.send(201).message('autopool stopped by admin')
  }

  try {
    // const {name, email, username, sponsor_id, position, amount } = req.body;
  let { user_id, packages, trx_password } = req.body;
  const userId = req.auth.id;
  //packages=parseFloat(packages);
//console.log(req.auth);
  // find user
  // if user ID is not there then send error

  if (!user_id || !packages) {
    res.status(400).json({message: "Please Enter all the Fields"});
  }

  else if(user_id !== userId){
    res.status(400).json({message: "Invalid user id"})
  }

  else{
    
    const thisuser = await User.findOne({ user_id: userId });
     
    //console.log(thisuser);
    const existingWallet = await Wallet.findOne({ user_id: userId });
    //console.log("oopppoopoopo")
    //if (user && trx_password === user.trx_password) {
      if(true){
        
      let depositeBalance = parseFloat(existingWallet.total_deposite);
      let totalIncome = parseFloat(existingWallet.total_income);
      packages=parseFloat(packages)
      

      //here deposit balance + total income sums upto present amount of user 
         
       console.log( depositeBalance,totalIncome,packages)

      if(( depositeBalance + totalIncome) >= packages)
      {  

       
         
        //console.log(thisuser);
        let currentlevel=0;

        if(thisuser.XV_idx!=-1)
        {
          currentlevel=15;
        }
        else if(thisuser.XIV_idx!=-1)
        {
          currentlevel=14;
        }
        
        else if(thisuser.XIII_idx!=-1)
        {
          currentlevel=13;
        }
        else if(thisuser.XII_idx!=-1)
        {
            currentlevel=12;
        }
        else if(thisuser.XI_idx!=-1)
        {
          currentlevel=11;
        }
        else if(thisuser.X_idx!=-1)
        {
          currentlevel=10;
        }
        else if(thisuser.IX_idx!=-1)
        {
          currentlevel=9;
        }
        else if(thisuser.VIII_idx!=-1)
        {
          currentlevel=8;
        }
        else if(thisuser.VII_idx!=-1)
        {
          currentlevel=7;
        }
        else if(thisuser.VI_idx!=-1)
        {
          currentlevel=6;
        }
        else if(thisuser.fifth_idx!=-1)
        {
          currentlevel=5;
        }
        else if(thisuser.fourth_idx!=-1)
        {
          currentlevel=4;
        }
        else if(thisuser.third_idx!=-1)
        {
          currentlevel=3;
        }
        else if(thisuser.second_idx!=-1)
        {
          currentlevel=2;
        }
        else if(thisuser.first_idx!=-1)
        {
          currentlevel=1;
        }
        console.log(currentlevel);
        //console.log("jhhkjkjk,n,khn,knh,k");
        let commision=0;
        if(currentlevel===1 && packages===50)
        {  commision=5;
          console.log("second");

          const upgradehistory= autopoolupdatehistory.create({
            Username:req.auth.id,
            amount:packages,
            updatedautopool:2
          })
          upgradehistory.save();

          await addtosecondautopool(user_id);

        }
        else  if(currentlevel===2 &&packages===100)
        {commision=10;
          console.log("third");
           
 
 
          addtothirdautopool(user_id);
          const upgradehistory= autopoolupdatehistory.create({
            Username:req.auth.id,
            amount:packages,
            updatedautopool:3
          })
          upgradehistory.save();
          
          await addtosecondautopool(user_id);
        }
        else  if(currentlevel===3 && packages===150)
        {commision=15;
          console.log("fourth");
          
 
            
 
 
          addtofourthautopool(user_id);
          const upgradehistory= autopoolupdatehistory.create({
            Username:req.auth.id,
            amount:packages,
            updatedautopool:4
          })
          upgradehistory.save();
          
          await addtosecondautopool(user_id);
        }
        else  if(currentlevel===4 && packages===280)
        {commision=20;
          console.log("fifth");
           
 
 
          addtofifthautopool(user_id);
          const upgradehistory= autopoolupdatehistory.create({
            Username:req.auth.id,
            amount:packages,
            updatedautopool:5
          })
          upgradehistory.save();
          
          await addtosecondautopool(user_id);
        }
        else  if(currentlevel===5 && packages===530)
        {commision=30;
          console.log("VI");
           
 
 
          addtoVIautopool(user_id);
          const upgradehistory= autopoolupdatehistory.create({
            Username:req.auth.id,
            amount:packages,
            updatedautopool:6
          })
          upgradehistory.save();
          
          await addtosecondautopool(user_id);
        }
        else  if(currentlevel===6 && packages===1020)
        {commision=35;
          console.log("VII");
          
 
 
          addtoVIIautopool(user_id);
          const upgradehistory= autopoolupdatehistory.create({
            Username:req.auth.id,
            amount:packages,
            updatedautopool:7
          })
          upgradehistory.save();
          
          await addtosecondautopool(user_id);
        }
        else  if(currentlevel===7 && packages===1990)
        { commision=40;
          console.log("VIII");
           
 
 
          addtoVIIIautopool(user_id);
          const upgradehistory= autopoolupdatehistory.create({
            Username:req.auth.id,
            amount:packages,
            updatedautopool:8
          })
          upgradehistory.save();
          
          await addtosecondautopool(user_id);
        }
        else  if(currentlevel===8 && packages===3920)
        {commision=45;
          console.log("IX");
           
 
 
          addtoIXautopool(user_id);
          const upgradehistory= autopoolupdatehistory.create({
            Username:req.auth.id,
            amount:packages,
            updatedautopool:9
          })
          upgradehistory.save();
          
          await addtosecondautopool(user_id);
        }
        else  if(currentlevel===9 && packages===7670)
        {commision=50;
          console.log("X");
         
 
          addtoXautopool(user_id);
          const upgradehistory= autopoolupdatehistory.create({
            Username:req.auth.id,
            amount:packages,
            updatedautopool:10
          })
          upgradehistory.save();
          
          await addtosecondautopool(user_id);
        }
        else  if( currentlevel===10 && packages===15460)
        { commision=55;
          console.log("XI");
          
 
 
          addtoXIautopool(user_id);
          const upgradehistory= autopoolupdatehistory.create({
            Username:req.auth.id,
            amount:packages,
            updatedautopool:11
          })
          upgradehistory.save();
          
          await addtosecondautopool(user_id);
        }
        else  if(currentlevel===11 && packages===30830)
        {commision=60;
          console.log("XII");
          
 
 
          addtoXIIautopool(user_id);
          const upgradehistory= autopoolupdatehistory.create({
            Username:req.auth.id,
            amount:packages,
            updatedautopool:12
          })
          upgradehistory.save();
          
          await addtosecondautopool(user_id);
        }
        else  if(currentlevel===12 && packages===61560)
        {commision=65;
          console.log("XIII");
          
 
 
          addtoXIIIautopool(user_id);
          const upgradehistory= autopoolupdatehistory.create({
            Username:req.auth.id,
            amount:packages,
            updatedautopool:13
          })
          upgradehistory.save();
          
          await addtosecondautopool(user_id);
        }
        else  if(currentlevel===13 && packages===123010)
        {commision=70;
          console.log("XIV");
           //commision to sponsor
        
 
          addtoXIVautopool(user_id);
          const upgradehistory= autopoolupdatehistory.create({
            Username:req.auth.id,
            amount:packages,
            updatedautopool:14
          })
          upgradehistory.save();
          
          await addtosecondautopool(user_id);
        }
        else  if(currentlevel===14 && packages===245900)
        {commision=75;
          console.log("XV");
          
 
          addtoXVautopool(user_id);
          const upgradehistory= autopoolupdatehistory.create({
            Username:req.auth.id,
            amount:packages,
            updatedautopool:15
          })
          upgradehistory.save();
          
          await addtosecondautopool(user_id);
        }
        else{
         return res.status(500).json({message:"wrong topup amount"})
          console.log("topup amount wrong")
        }
       
        
        
        if(depositeBalance<packages)
        {
          depositeBalance=0;
          totalIncome-=(packages-depositeBalance);
        }
        else{
          depositeBalance-=packages;
        }

        
       existingWallet.total_deposite=depositeBalance
       existingWallet.total_income=totalIncome;

       await existingWallet.save();

         return res.status(201).json(existingWallet);

      }

      else{
        
        res.status(400).json({message: "not sufficent amount available"});
      }

    }
    else{
      
      res.status(400).json({message: "invalid trx password "})
    }

  }

}
catch(err)
{
  res.status(400).json({message: err})
    
}

};

// get topup history
const topupHistory = async (req, res) => {
  try {
    // const user_id = req.params.user_id;
    const user_id = req.auth.id;
  if (!user_id) {
    res.status(400);
    throw new Error("Data not found");
  }
  const topupInfo = await Topup.findOne({ user_id: user_id })
  // .populate("user");
  if (topupInfo) {
    res.status(200).json({
      user: topupInfo.user,
      transaction_id: topupInfo.transaction_id,
      history: topupInfo.history,
    });
  } else {
    res.status(400).json({
        message: "Cannot find topup information",
    });
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
};

// Fund transfer
const fundTransfer = async (req, res) => {
  try {
    const { receiver_id, amount } = req.body;
    const  user_id = req.auth.id;
  if (!user_id || !receiver_id || !amount) {
    res.status(400).json({
        message: "Please provide all data",
    });
  }else{
    const user = await User.findOne({ user_id: user_id });
    // const receiverAccount = await User.findOne({ user_id: receiver_id });
  if (user) {
    const walletSender = await Wallet.findOne({ user_id: user_id });
      if(user.topup_status){
        if (walletSender && parseFloat(walletSender.total_deposite) + parseFloat(walletSender.total_income) >= amount) {
          const depositeBalance = parseFloat(walletSender.total_deposite);
          const totalIncome = parseFloat(walletSender.total_income);
          // check existing transfer fund collection
          const existingFundTransfer = await TransferFund.findOne({
            user_id: user_id,
          });
          if (!existingFundTransfer) {
            // make new fund transfer
            const newFundTransfer = await TransferFund.create({
              user: user._id,
              user_id: user_id,
              receiver_id: receiver_id,
              amount: parseFloat(amount),
              history: [
                {
                  user_id: user_id,
                  name: user.name,
                  receiver_id: receiver_id,
                  requested_amount: parseFloat(amount),
                  charge: 10,
                  amount_after_charge: parseFloat(amount) - ((parseFloat(amount)*10) / 100),
                  date: new Date().toDateString(),
                  status: "success",
                  transaction_id: generateString(15),
                  time: getIstTime(),
                },
              ],
            });
            if (newFundTransfer) {
              // update sender wallet
              // find wallet
              const senderWallet = await Wallet.findOne({ user_id: user_id });
              if(depositeBalance >= parseFloat(amount)){
                const updateSenderWallet = await Wallet.findOneAndUpdate(
                  { user_id: user_id },
                  {
                    $set: {
                      total_deposite: parseFloat(senderWallet.total_deposite) - parseFloat(amount),
                    },
                  }
                );
              }
              if(depositeBalance <= parseFloat(amount) && (totalIncome + depositeBalance) >= parseFloat(amount)){
                const updateSenderWallet = await Wallet.findOneAndUpdate(
                  { user_id: user_id },
                  {
                    $set: {
                      total_deposite: 0,
                      total_income: ((parseFloat(senderWallet.total_income) + parseFloat(senderWallet.total_deposite)) - (parseFloat(amount))),
                    },
                  }
                  );
                }
                // update receiver wallet
                // find wallet
                const receiverWallet = await Wallet.findOne({
                  user_id: receiver_id,
                });
                const updateReceiverWallet = await Wallet.findOneAndUpdate(
                { user_id: receiver_id },
                {
                  $set: {
                    total_deposite:
                      parseFloat(receiverWallet.total_deposite) +
                      (parseFloat(amount) - ((parseFloat(amount) * 10) / 100)),
                  },
                  }
                );
                // update sponsor's wallet
                // find sponsor account 
                const sponsorAcc = await User.findOne({user_id: user?.sponsor_id});
                if(sponsorAcc.topup_status){
                  await Wallet.findOneAndUpdate({user_id: user?.sponsor_id},{
                    $inc: {
                      direct_fund_transfer_income: + ((parseFloat(amount) * 5) / 100),
                      total_income: + ((parseFloat(amount) * 5) / 100)
                    }
                  })
                  await DirectFundtransferIncome.create({
                    name: sponsorAcc?.name,
                    user_id: sponsorAcc?.user_id,
                    transaction_id: generateString(),
                    amount: (parseFloat(amount)*5) / 100,
                    type: "Direct Withdraw Income",
                    income_from: user?.user_id,
                  })
                }
                // admin income or lost in the system
                // update admin's wallet
                // await Wallet.findOneAndUpdate({user_id: "ADMIN"},{
                //   $inc: {
                //     direct_fund_transfer_income: + ((parseFloat(amount) * 5) / 100),
                //     total_income: + ((parseFloat(amount) * 5) / 100)
                //   }
                // })
              }
              res.status(200).json({
                message: "Successfully Transfer fund",
              });
          } else {
            // update existing fund transfer collection
            const updateExistingFundTransfer =
              await TransferFund.findOneAndUpdate(
                {
                  user_id: user_id,
                },
                {
                  $set: {
                    amount:
                      parseFloat(existingFundTransfer.amount) +
                      parseFloat(amount),
                  },
                  $push: {
                    history: {
                      user_id: user_id,
                      name: user.name,
                      receiver_id: receiver_id,
                      requested_amount: parseFloat(amount),
                      charge: 10,
                      amount_after_charge: parseFloat(amount) - ((parseFloat(amount)*10) / 100),
                      date: new Date().toDateString(),
                      transaction_id: generateString(15),
                      status: "success",
                      time: getIstTime(),
                    },
                  },
                }
              );
            if (updateExistingFundTransfer) {
              // update sender wallet
              // find sender wallet
              const senderWallet = await Wallet.findOne({ user_id: user_id });
              if(depositeBalance >= parseFloat(amount)){
                const updateSenderWallet = await Wallet.findOneAndUpdate(
                  { user_id: user_id },
                  {
                    $set: {
                      total_deposite: parseFloat(senderWallet.total_deposite) - parseFloat(amount),
                    },
                  }
                );
              }
              if(depositeBalance <= parseFloat(amount) && (totalIncome + depositeBalance) >= parseFloat(amount)){
                const updateSenderWallet = await Wallet.findOneAndUpdate(
                  { user_id: user_id },
                  {
                    $set: {
                      total_deposite: 0,
                      total_income: ((parseFloat(senderWallet.total_income) + parseFloat(senderWallet.total_deposite)) - (parseFloat(amount))),
                    },
                  }
                  );
                  }
              // update receiver wallet
              // find receiver wallet
              const receiverWallet = await Wallet.findOne({
                user_id: receiver_id,
              });
              const updateReceiverWallet = await Wallet.findOneAndUpdate(
                { user_id: receiver_id },
                {
                  $set: {
                    total_deposite:
                      parseFloat(receiverWallet.total_deposite) +
                      (parseFloat(amount) - ((parseFloat(amount) * 10) / 100)),
                  },
                }
              );
              // update sponsor's wallet
              // find sponsor account 
              const sponsorAcc = await User.findOne({user_id: user?.sponsor_id});
              if(sponsorAcc.topup_status){
                await Wallet.findOneAndUpdate({user_id: user?.sponsor_id},{
                  $inc: {
                    direct_fund_transfer_income: + ((parseFloat(amount) * 5) / 100),
                    total_income: + ((parseFloat(amount) * 5) / 100)
                  }
                })
                await DirectFundtransferIncome.create({
                  name: sponsorAcc?.name,
                  user_id: sponsorAcc?.user_id,
                  transaction_id: generateString(),
                  amount: (parseFloat(amount)*5) / 100,
                  type: "Direct Withdraw Income",
                  income_from: user?.user_id,
                })
              }

              // admin income or lost in the system 
              // update admin's wallet
              // await Wallet.findOneAndUpdate({user_id: "ADMIN"},{
              //   $inc: {
              //     direct_fund_transfer_income: + ((parseFloat(amount) * 5) / 100),
              //     total_income: + ((parseFloat(amount) * 5) / 100)
              //   }
              // })
            }
            res.status(200).json({
              message: "Successfully Transfer fund",
            });
          }
        } else {
          res.status(400).json({
              message:
                "Insufficient balance",
          });
        }
      }else {
        res.status(400).json({
            message: "Your account is not accctive yet!",
        });
      }
    } else {
      res.status(400).json({
          message: "Invalid user ID",
      });
    }
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
};

// get transfer fund history
const transferFundHistory = async (req, res) => {
  try {
    // const userId = req.params.user_id;
    const userId = req.auth.id;
  if (userId) {
    const transferFund = await TransferFund.findOne({ user_id: userId });
    if (transferFund) {
      res.status(200).json({
        _id: transferFund._id,
        user: transferFund.user,
        user_id: transferFund.user_id,
        receiver_id: transferFund.receiver_id,
        amount: transferFund.amount,
        status: transferFund.status,
        history: transferFund.history.reverse(),
      });
    } else {
      res.status(400).json({
          message: "Cannot find transfer fund history",
      });
    }
  } else {
    res.status(400).json({
        message: "Cannot find user ID",
    });
  }
  } catch (error) {
    res.status(400).json({
      error: error.toString()
    })
  }
};

// get wallet data
const getWallet = async (req, res) => {
  try {
    // const userId = req.params.user_id;
    const userId = req.auth.id;
  if (userId) {
    const data = await Wallet.findOne({ user_id: userId })
    // complete withdraw
    const withdraw = await Withdraw.find({user_id: userId});
    let totalWithdraw = 0;
    let allWithdraw = [];
    const withdrawHistory = withdraw.map( w=> allWithdraw = [...allWithdraw, w.request_amount]);
    allWithdraw.map(t=> totalWithdraw = parseFloat(totalWithdraw) + parseFloat(t));
    const newData = {...data._doc, total_withdraw: totalWithdraw}
    res.status(200).json(newData);
  } else {
    res.send({
      status: 400,
      message: "Cannot get wallet",
      error: 400,
    });
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
};

// Withdraw
const withdrawAmount = async (req, res) => {
  try {
    const { amount, trx_password, trx_address, otpCode} = req.body;
    const user_id = req.auth.id;
  // find user
  const user = await User.findOne({ user_id: user_id });
  // check OTP
  const otp = await Otp.findOne({ email: user.email });
  if (parseFloat(otp?.code) === parseFloat(otpCode)) {
    if (user && user.trx_password === trx_password) {
      if(parseFloat(amount) >= 10){
        if (user) {
          const wallet = await Wallet.findOne({ user_id: user_id });
          if(user.topup_status){
            if (wallet && parseFloat(wallet.total_income) >= parseFloat(amount)) {
              const time = getIstTime()
                const updateWithdraw = await Withdraw.create(
                  {
                        user_id: user.user_id,
                        sponsor_id: user.sponsor_id,
                        request_amount: amount,
                        withdraw_charge: 10,
                        amount_after_charge: (parseFloat(amount) - (parseFloat(amount) * 10)/100),
                        trx_address: trx_address,
                        status: "pending",
                        current_amount: parseFloat(wallet.total_income) - parseFloat(amount),
                        transaction_id: generateString(15),
                        date: new Date().toDateString(),
                        time: time.time,
                  },
                );
                // update wallet
                if (updateWithdraw) {
                  const updateWallet = await Wallet.findOneAndUpdate(
                    { _id: wallet._id },
                    {
                      $set: {
                        total_income: parseFloat(wallet.total_income) - parseFloat(amount),
                        total_withdraw: parseFloat(wallet.total_withdraw) + parseFloat(amount),
                      },
                    }
                    );
    
                  res.status(200).json({
                    message: "Withdarw request Successfull",
                  });
                } else {
                  res.status(400).json({
                      message: "Cannot Update wallet",
                  });
                }
            } else {
              res.status(400).json({
                message: "Insufficient balance",
              });
            }
          }else{
            res.status(400).json({
              message: "Your account is not active yet!",
            });
          }
          // res.status(200).json(data);
        } else {
          res.status(400).json({
            message: "Invalid user credentials",
          });
        }
      }else{
        res.status(400).json({
          message: "Minimum withdraw amount is 10"
        })
      }
    } else {
      res.status(400).json({
          message: "Transaction password invalid",
      });
    }
  }else{
    res.status(400).json({
        message: "Invalid OTP",
    });
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
};

// get withdraw history
const withdrawHistory = async (req, res) => {
  try {
    // const user_id = req.params.user_id;
    const user_id = req.auth.id;
  if (!user_id) {
    res.status(400);
    throw new Error("Data not found");
  }
  const withdrawInfo = await Withdraw.find({ user_id: user_id })
  // .populate(
  //   "user"
  // );
  if (withdrawInfo) {
    res.status(200).json({
      history: withdrawInfo,
    });
  } else {
    res.status(400).json({
        message: "Cannot find withdraw information",
    });
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
};


// get level Income
const getDirectLevelIncome = async (req, res) => {
  try {
    // const userId = req.params.user_id;
    const userId = req.auth.id;
    if (userId) {
      const levelIncome = await LevelIncome.find({$and: [{ user_id: userId }, {type: "Direct"}]}).sort({createdAt: -1});
      if (levelIncome) {
        res.status(200).json(levelIncome);
      } else {
        res.status(400).json({
            message: "Cannot find Level Income",
        });
      }
    } else {
      res.status(400).json({
          message: "Cannot find user ID",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
};

// get level Income
const getIndirectLevelIncome = async (req, res) => {
  try {
    // const userId = req.params.user_id;
    const userId = req.auth.id;
    if (userId) {
      const levelIncome = await LevelIncome.find({$and: [{ user_id: userId }, {type: "Indirect"}]}).sort({createdAt: -1});
      if (levelIncome) {
        res.status(200).json(levelIncome);
      } else {
        res.status(400).json({
            message: "Cannot find Level Income",
        });
      }
    } else {
      res.status(400).json({
          message: "Cannot find user ID",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
};

// get level Income
const getRewardIncome = async (req, res) => {
  try {
    // const userId = req.params.user_id;
    const userId = req.auth.id;
  if (userId) {
    const rewardIncome = await RewardIncome.find({ user_id: userId });
    if (rewardIncome) {
      res.status(200).json(rewardIncome);
    } else {
      res.status(400).json({
          message: "Cannot find Level Income",
      });
    }
  } else {
    res.status(400).json({
        message: "Cannot find user ID",
    });
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
};

// update user profile picture
const updateProfilePic = async (req, res) => {
  try {
    const user_id = req.auth.id;
    if(!req.file?.path) res.status(400).json({
      message: "Image is missing",
    });
    const findUser = await User.findOne({user_id: user_id});
    if (findUser.avatar_public_url) {
      await Cloudinary.uploader.destroy(findUser.avatar_public_url);
    }
    const image = await Cloudinary.uploader.upload(req.file.path);
    const avatar = {
      avatar: image.secure_url,
      avatar_public_url: image.public_id,
    };
    const upImage = await User.findOneAndUpdate({user_id: user_id}, {
      $set: {
        avatar: avatar.avatar,
        avatar_public_url: avatar.avatar_public_url
      }
    });
    // await upImage.save();
    return res.status(200).json({ message: "Image uploaded" });
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: error.message });
  }
};

// update user profile picture
const upLoadProofPic = async (req, res) => {
  try {
    // const user_id = req.auth.id;
    const image = await Cloudinary.uploader.upload(req.file.path);
    const avatar = {
      avatar: image.secure_url,
      avatar_public_url: image.public_id,
    };
    return res.status(200).json({ avatar });
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: error.message });
  }
};

// update TRX wallet address
const updateTrxAddress = async (req, res) =>{
  try {
    const {trx_address} = req.body;
    const user_id = req.auth.id;
    if(!trx_address){
      res.status(400).json({message: "USDT address is missing"});
    }
    // find User
    const user = await User.findOneAndUpdate({user_id: user_id}, {
      $set: {
        wallet_address: trx_address
      }
    })
    // find wallet
    const wallet = await Wallet.findOneAndUpdate({user_id: user_id}, {
      $set: {
        wallet_address: trx_address
      }
    })
    if(wallet && user){
      res.status(200).json({message: "USDT address changed successfully"})
    }else{
      res.status(400).json({message: "Cannot change USDT address"})
    }
  } catch (error) {
    //console.log(error)
    res.status(500).json({
      message: error.toString()
    })
  }
}

// Support ticket
const createSupportTicket = async (req, res) =>{
  try {
    const {purpose, previous_ticket_reff, question} = req.body;
    const user_id = req.auth.id;

    if(!req.body) res.status(400).json({
      message: "Please provide data",
    });
    if(!req.file?.path) res.status(400).json({
      message: "Image is missing",
    });
    if(!user_id) res.status(400).json({
      message: "User Id is missing",
    });
    if(!purpose) res.status(400).json({
      message: "Purpose is missing",
    });
    if(!previous_ticket_reff) res.status(400).json({
      message: "Previous refference is missing",
    });
    if(!question) res.status(400).json({
      message: "Question is missing",
    });

    // find user 
    const user = await User.findOne({user_id: user_id});

    // upload the image
    const image = await Cloudinary.uploader.upload(req.file?.path);
    const avatar = {
      avatar: image.secure_url,
      avatar_public_url: image.public_id,
    };

    if(user){
      // already have support tckect collection or not
      const existingSupport = await SupportTicket.findOne({user_id: user_id});
      if(!existingSupport){
        const newSupportTicket = await SupportTicket.create({
          user_id: user.user_id,
          user_name: user.name,
          history: [
            {
              user_id: user.user_id,
              email: user.email,
              mobile: user.mobile,
              purpose,
              previous_ticket_reff,
              image: avatar,
              question,
              date: new Date().toDateString(),
              time: getIstTime(),
            }
          ]
        });
        if(newSupportTicket){
          res.status(200).json({
            message: "Support ticket created successfully"
          })
        }else{
          res.status(400).json({
            message: "Cannot create support ticket"
          })
        }
      }else{
        // update existing support
        const updateSupport = await SupportTicket.findOneAndUpdate({user_id: user_id}, {
          $push: {
            history: {
              user_id: user.user_id,
              user_name: user.name,
              email: user.email,
              mobile: user.mobile,
              purpose,
              previous_ticket_reff,
              image: avatar,
              question,
              date: new Date().toDateString(),
              time: getIstTime(),
            }
          }
        });
        if(updateSupport){
          res.status(200).json({
            message: "Support ticket created successfully"
          })
        }else{
          res.status(400).json({
            message: "Cannot create support ticket"
          })
        }
      }
    }else{
      res.status(400).json({
        message: "Invalid user credentials"
      })
    }
  } catch (error) {
    //console.log(error)
    res.status(500).json({
      message: error.toString()
    })
  }
}

// get support history
const getSupportHistory = async (req, res) =>{
  try {
    // const userId = req.params.user_id;
    const userId = req.auth.id;
  if (userId) {
    const supportTicket = await SupportTicket.findOne({ user_id: userId }).sort({"history.date": -1, "history.time": -1});
    if (supportTicket) {
      res.status(200).json(supportTicket);
    } else {
      res.status(400).json({
          message: "Cannot find support ticket",
      });
    }
  } else {
    res.status(400).json({
        message: "Cannot find user credentials",
    });
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
}

// create contact us mesasge
const createContactUs = async (req, res)=>{
  try {
    const {message, name, user_id, email} = req.body;
    const userId = req.auth.id;
    const subject = "about tron";

    if(!req.body) res.status(400).json({
      message: "Please provide data",
    });
    if(!message) res.status(400).json({
      message: "Message is missing",
    });
    if(!name) res.status(400).json({
      message: "Name is missing",
    });
    if(!user_id) res.status(400).json({
      message: "User ID is missing",
    });
    if(!email) res.status(400).json({
      message: "Email is missing",
    });

    // find user 
    const user = await User.findOne({user_id: user_id});

    if(user && user_id === userId){
      // already have Contact collection or not
      const existingContact = await Contact.findOne({user_id: user_id});
      if(!existingContact){
        const newContact = await Contact.create({
          user_id: user.user_id,
          user_name: name,
          history: [
            {
              user_id: user.user_id,
              user_name: name,
              email,
              message,
              subject,
              date: new Date().toDateString(),
              time: getIstTime(),
            }
          ]
        });
        if(newContact){
          res.status(200).json({
            message: "Contact us message created successfully"
          })
        }else{
          res.status(400).json({
            message: "Cannot create contact us message"
          })
        }
      }else{
        // update existing support
        const updateContact = await Contact.findOneAndUpdate({user_id: user_id}, {
          $push: {
            history: {
              user_id: user.user_id,
              user_name: name,
              email,
              message,
              subject,
              date: new Date().toDateString(),
              time: getIstTime(),
            }
          }
        });
        if(updateContact){
          res.status(200).json({
            message: "Contact us message created successfully"
          })
        }else{
          res.status(400).json({
            message: "Cannot create contact us message"
          })
        }
      }
    }else{
      res.status(400).json({
        message: "Invalid user credentials"
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
}

// get contact us history
const getContactUsHistory = async (req, res) =>{
  try {
    // const userId = req.params.user_id;
    const userId = req.auth.id;
  if (userId) {
    const contactUs = await Contact.findOne({ user_id: userId }).sort({"history.date": -1, "history.time": -1});
    if (contactUs) {
      res.status(200).json(contactUs);
    } else {
      res.status(400).json({
          message: "Cannot find Contact us history",
      });
    }
  } else {
    res.status(400).json({
        message: "Cannot find user credentials",
    });
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
}

// get updates
const getUpdates = async (req, res) =>{
  try {
    // const userId = req.params.user_id;
    const userId = req.auth.id;
  if (userId) {
    const updates = await Update.find({}).sort({date: -1});
    if (updates) {
      res.status(200).json(updates);
    } else {
      res.status(400).json({
          message: "Cannot find any updates",
      });
    }
  } else {
    res.status(400).json({
        message: "Cannot find user credentials",
    });
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
}

// level income chart
const levelIncomeChart = async( req, res ) =>{
  try {
    // const userId = req.params.user_id;
    const userId = req.auth.id;
    if (userId) {
      const levelIncome = await LevelIncome.findOne({ user_id: userId }).sort({"level_income.date": 1});
      let levelIncomeDailyTotal = [];
      let levelIncomeDailyDate = [];
      for (let i = 0; i < 7; i++) {
        let date = new Date();
        let dailyIncome = 0;
        let week = date.setDate(date.getDate() - i);
        let specificDate = new Date(week).toDateString();
        for (let j = 0; j < levelIncome.level_income?.length; j++) {
          const checkingDate = new Date(levelIncome.level_income[j]?.date).toDateString();
          if (specificDate === checkingDate) {
            dailyIncome += levelIncome.level_income[j].amount;
          }
        }
        levelIncomeDailyTotal.push(parseFloat(dailyIncome.toFixed(3)));
        levelIncomeDailyDate.push(specificDate);
      }
      res.status(200).json({
        levelIncomeDailyTotal,
        levelIncomeDailyDate,
      })
    } else {
      res.status(400).json({
          message: "Cannot find user ID",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
}

// reward income chart
const rewardIncomeChart = async( req, res ) =>{
  try {
    // const userId = req.params.user_id;
    const userId = req.auth.id;
  if (userId) {
    const rewardIncome = await RewardIncome.find({ user_id: userId }).sort({createdAt: 1});
    let rewardIncomeDailyTotal = [];
      let rewardIncomeDailyDate = [];
      for (let i = 0; i < 7; i++) {
        let date = new Date();
        let dailyIncome = 0;
        let week = date.setDate(date.getDate() - i);
        let specificDate = new Date(week).toDateString();
        for (let j = 0; j < rewardIncome.createdAt?.length; j++) {
          const checkingDate = new Date(rewardIncome[j]?.createdAt).toDateString();
          if (specificDate === checkingDate) {
            dailyIncome += parseFloat(rewardIncome[j].amount);
          }
        }
        rewardIncomeDailyTotal.push(parseFloat(dailyIncome.toFixed(3)));
        rewardIncomeDailyDate.push(specificDate);
      }
      res.status(200).json({
        rewardIncomeDailyTotal,
        rewardIncomeDailyDate,
      })
  } else {
    res.status(400).json({
        message: "Cannot find user ID",
    });
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
}


const getGiftIncomeHistory = async(req, res)=>{
  try {
    const userId = req.auth.id
    const gitfIncome = await GiftIncome.find({user_id: userId});
    res.status(200).json({gift_income: gitfIncome}) 
  } catch (error) {
    console.log(error)
  }
}

const getDirectWithdrawIncome = async (req, res)=>{
  try {
    const DirectWithdraw = await DirectWithdrawIncome.find({user_id: req.auth.id});
    res.status(200).json(DirectWithdraw);
  } catch (error) {
    console.log(error)
  }
}

const getMonthlyDirectTeam = async(req, res)=>{
  try {

    const userId = req.auth.id;
    // users
    const user = await User.findOne({$and:[{user_id: userId}, {topup_status: true}]}).select(["-trx_password", "-password", "-token"]);
        // get all downline users for specific user
        const allDownlineUsers = await User.find({$and: [{sponsor_id: user?.user_id}, {topup_status: true}]});
        // get already gifted array for specific user
        const giftedArr = await GiftedUser.findOne({user_id: user?.user_id});

        // filter new downline for count condition for gifting
        let recentDownline = [];
        for(var n = 0; n < allDownlineUsers.length; n++){
          if(!giftedArr?.history?.includes(allDownlineUsers[n].user_id)){
            recentDownline.push(allDownlineUsers[n].user_id)
          }
        }
    res.status(200).json({Current_direct_member: recentDownline?.length})
  } catch (error) {
    console.log(error)
  }
}

const getDirectFundtransferIncome = async(req, res)=>{
  try {
    const fundtramsferIncome = await DirectFundtransferIncome.find({user_id: req.auth.id});
    res.status(200).json(fundtramsferIncome)
  } catch (error) {
    console.log(error)
  }
}

const getUserActivationIncome = async(req, res)=>{
  try {
    const userActivationIncome = await UserActivationIncome.find({user_id: req.auth.id});
    res.status(200).json(userActivationIncome)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getUserInfo,
  updateUserInfo,
  getRefferalInfo,
  changePassword,
  updateEmail,
  changeTrxPassword,
  getLevelTeam,
  depositeAmount,
  depositeHistory,
  topupHistory,
  getWallet,
  withdrawAmount,
  withdrawHistory,
  getDirectLevelIncome,
  getIndirectLevelIncome,
  getRewardIncome,
  fundTransfer,
  transferFundHistory,
  updateProfilePic,
  upLoadProofPic,
  updateTrxAddress,
  createSupportTicket,
  getSupportHistory,
  createContactUs,
  getContactUsHistory,
  getUpdates,
  levelIncomeChart,
  rewardIncomeChart,
  makeTopup,
  getautopoolData,
  autopooltopup,
  getautopoolchilddata,
  gettreeautopool,
  boosttopup,
  getGiftIncomeHistory,
  boostgettreeautopool,
  getautopoolupdatehistory,
  getcurrentautopool,
  getboosterhistory,
  getboostupdatehistory,
  royaltyincomehistory,
  UserActivation,
  getDirectWithdrawIncome,
  getMonthlyDirectTeam,
  getDirectFundtransferIncome,
  getUserActivationIncome,
};
