const bcrypt = require("bcryptjs");
const User = require("../../models/userModel");
const Withdraw = require("../../models/withdrawModel");
const Topup = require("../../models/topUpModel");
const Deposite = require("../../models/depositeModel");
const LevelIncome = require("../../models/levelIncomeModel");
const TransferFund = require("../../models/transferFundModel");
const Otp = require("../../models/otpModel");
const updateLevelIncome = require("../../config/updateLevelIncome");
const SupportTicket = require("../../models/supportTicketModel");
const Contact = require("../../models/contactUsModel");
const Update = require("../../models/updateModel");
const Wallet = require("../../models/walletModel");
const transferFund=require('../../models/transferFundModel');
const generateString = require("../../config/generateRandomString");
const PopupImage = require("../../models/popupImageModel");
const Cloudinary = require("../../config/cloudinary.js");
let {autopoolcontrol,rewardcontrol,display}=require('../../config/variables');
const GiftIncome = require("../../models/giftIncomeModel");
const DirectWithdrawIncome = require("../../models/directWithdrawIncomeMode");
const RewardIncome = require("../../models/rewardModel");
const GiftedUser = require("../../models/giftedUserModel");
const getIstTime = require("../../config/getTime");
const VideoData = require("../../models/videoModel");
const Level = require("../../models/levelModel");
const AutopoolSetting = require("../../models/autopool-trial/autopoolSettingMode");
const AutopoolOne = require("../../models/autopool-trial/allAutopool/autopoolOneModel");
const AutopoolTwo = require("../../models/autopool-trial/allAutopool/autopoolTwoModel");
const AutopoolThree = require("../../models/autopool-trial/allAutopool/autopoolThreeModel");
const AutopoolFour = require("../../models/autopool-trial/allAutopool/autopoolFourModel");
const AutopoolFive = require("../../models/autopool-trial/allAutopool/autopoolFiveModel");
const AutopoolSix = require("../../models/autopool-trial/allAutopool/autopoolSixModel");
const AutopoolSeven = require("../../models/autopool-trial/allAutopool/autopoolSevenModel");
const AutopoolEight = require("../../models/autopool-trial/allAutopool/autopoolEightModel");
const AutopoolNine = require("../../models/autopool-trial/allAutopool/autopoolNineModel");
const AutopoolTen = require("../../models/autopool-trial/allAutopool/autopoolTenModel");
const AutopoolEleven = require("../../models/autopool-trial/allAutopool/autopoolElevenModel");
const AutopoolTwelve = require("../../models/autopool-trial/allAutopool/autopoolTwelveModel");
const AutopoolThirteen = require("../../models/autopool-trial/allAutopool/autopoolThirteenModel");
const AutopoolFourteen = require("../../models/autopool-trial/allAutopool/autopoolFourteenModel");
const AutopoolFifteen = require("../../models/autopool-trial/allAutopool/autopoolFifteenModel");
const AutopoolSixteen = require("../../models/autopool-trial/allAutopool/autopoolSixteenModel");


const sendtoroyaltymembers=async(req,res)=>{



  const amount=req.body.amount;
  
  const data=await User.find({XI_idx:{$gt:-1}});
  
   amount=amount/(data.length);
   amount=amount.toFixed(3);
   console.log(data);

  for(let user of data)
  { //console.log(user)
     let wallet=await Wallet.findOne({user_id:user.user_id});
     let pp=parseFloat(wallet.total_income);
     pp+=amount;
     wallet.total_income=pp;///wallet.royalty_income+=amount;
     await wallet.save();

     const transaction=await transferFund.create({
      user_id:'RFC001',
      reciever_id:user.user_id,
      amount:amount

     });
     await transaction,save();

  }
  res.status(201).json({'message':'amount is distributed'});

}


const getroyaltymembers=async (req,res)=>{
  const data=await User.find({XI_idx:{$gt:-1}});
 

  res.status(201).json(data);
}

//get all diplay
const viewdisplayoptions=(req,res)=>{
 res.status(201).json(display);
}

const editdisplayoptions=(req,res)=>{
  display=req.body.display;
  res.status(201).json(display);
 }

const stopautopool= async (req,res)=>{
  console.log(autopoolcontrol);

  autopoolcontrol=false;
  return res.status(201).json('succesfully stopped autopool');

};
const startautopool= async (req,res)=>{
  console.log(autopoolcontrol);

  autopoolcontrol=true;
  return res.status(201).json('succesfully started autopool');

};

const stopreward= async (req,res)=>{
  console.log(rewardcontrol);

  rewardcontrol=false;
  return res.status(201).json('succesfully stopped reward');

};
const startreward= async (req,res)=>{
  console.log(rewardcontrol);

  rewardcontrol=true;
  return res.status(201).json('succesfully started reward');

};
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).sort({join_date: -1}).select("-password");
  if (users) {
    res.status(200).json(users);
  } else {
    res.send({
      status: 400,
      message: "Cannot access",
      error: 400,
    });
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
};

// change user Status
const changeUserStatus = async (req, res) => {
  try {
    const {user_id} = req.body;
    const user = await User.findOne({user_id: user_id});
    const updateUserStatus = await User.findOneAndUpdate({user_id: user_id},{
    $set: {
      user_status: !user.user_status
    }
  });
  if(updateUserStatus){
    res.status(200).json({
      message: "Successfully changed user Status"
    })
  }else{
    res.status(400).json({
      message: "Cannot change user status"
    })
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
};

// Get active user
const getActiveUser = async (req, res) => {
  try {
    const user = await User.find({ topup_status: true }).sort({join_date: -1}).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

// Get active user
const getBlockedUser = async (req, res) => {
  try {
    const user = await User.find({ user_status: false }).sort({join_date: -1}).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

// All user list
const userAnalytics = async (req, res) =>{
  try {
    // user
    const user = await User.find({}).sort({join_date: -1}).select("-password");
    const activeUser = user.filter(a=> a.topup_status === true);
    const blockUser = user.filter(b=> b.user_status === false);
    // pending withdraw
    const withdraw = await Withdraw.find({});
    let allWithdraw = [];
    let totalPendingWithdraw = 0;
    const pendingWithdrawHistory = withdraw.map( w=> w.history.map(h=> allWithdraw = [...allWithdraw, h]));
    const pendingWithdraws = allWithdraw.filter(p=> p.status === "pending");
    pendingWithdraws.map(t=> totalPendingWithdraw = parseFloat(totalPendingWithdraw) + parseFloat(t.amount));
    // complete withdraw
    let totalWithdraw = 0;
    // const withdrawHistory = withdraw.map( w=> w.history.map(h=> allWithdraw = [...allWithdraw, h]));
    const completeWithdraws = allWithdraw.filter(p=> p.status === "success");
    completeWithdraws.map(t=> totalWithdraw = parseFloat(totalWithdraw) + parseFloat(t.amount));
    // all deposite
    const deposite = await Deposite.find({});
    let allDeposite = [];
    let totalDeposite = 0;
    const depositeHistory = deposite.map( w=> w.history.map(h=> allDeposite = [...allDeposite, h]));
    allDeposite.map(t=> totalDeposite = parseFloat(totalDeposite) + parseFloat(t.amount));
    // Invest
    const topup = await Topup.find({});
    let allTopup = [];
    let totalInvest = 0;
    const topupHistory = topup.map( w=> w.history.map(h=> allTopup = [...allTopup, h]));
    allTopup.map(t=> totalInvest = parseFloat(totalInvest) + parseFloat(t.packages));
  if(user){
    res.status(200).json({
      allUser: user.length,
      activeUser: activeUser.length,
      blockUser: blockUser.length,
      allWithdraw: totalWithdraw,
      pendingWithdraws: totalPendingWithdraw,
      totalInvest,
      totalDeposite, 
    })
  }
  } catch (error) {
    //console.log(error)
    res.status(400).json({
      error: error
    })
  }
}

// active user list
const activeUserCount = async (req, res) =>{
  try {
    const user = await Withdraw.update({"history": {
      $elemMatch: {
        transaction_id: "c7507201-0b38-418d-987e-6570055985a2"
      }
    }},{
      $pull: {
        "history": {transaction_id: "c7507201-0b38-418d-987e-6570055985a2"}
      }
    });
  if(user){
    res.status(200).json({
      active_user: user
    })
  }
  } catch (error) {
    //console.log(error)
    res.status(400).json({
      error: error
    })
  }
}

// active user list
const blockedUserCount = async (req, res) =>{
  try {
    const user = await User.find({user_status: false});
  if(user){
    res.status(200).json({
      blocked_user: user.length
    })
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
}

// get pending whithdraw Count
const pendingWithdrawCount = async (req, res) =>{
  try {
    const withdraw = await Withdraw.find({});
    let allWithdraw = [];
    let totalWithdraw = 0;
    const withdrawHistory = withdraw.map( w=> w.history.map(h=> allWithdraw = [...allWithdraw, h]));
    const pendingWithdraws = allWithdraw.filter(p=> p.status === "pending");
    pendingWithdraws.map(t=> totalWithdraw = parseFloat(totalWithdraw) + parseFloat(t.amount));
    res.send({
      pending_withdraw: totalWithdraw
    })
  } catch (error) {
    res.send(error)
  }
}

// get complete whithdraw Count
const completeWithdrawCount = async (req, res) =>{
  try {
    const withdraw = await Withdraw.find({});
    let allWithdraw = [];
    let totalWithdraw = 0;
    const withdrawHistory = withdraw.map( w=> w.history.map(h=> allWithdraw = [...allWithdraw, h]));
    const completeWithdraws = allWithdraw.filter(p=> p.status === "success");
    completeWithdraws.map(t=> totalWithdraw = parseFloat(totalWithdraw) + parseFloat(t.amount));
    res.send({
      complete_withdraw: totalWithdraw
    })
  } catch (error) {
    res.send(error)
  }
}

// get All deposite history
const allDepositeHistory = async (req, res) =>{
  try {
    const deposite = await Deposite.find({}).sort({ updatedAt: -1,"history.date": 1});
    let allDeposite = [];
    const depositeHistory = deposite.map( w=> w.history.map(h=> allDeposite = [...allDeposite, h]));
    res.send(allDeposite)
  } catch (error) {
    res.send(error)
  }
}

// get success deposite history
const successDepositeHistory = async (req, res) =>{
  try {
    const deposite = await Deposite.find({});
    let allDeposite = [];
    const depositeHistory = deposite.map( w=> w.history.map(h=> allDeposite = [...allDeposite, h]));
    const successDeposite = allDeposite.filter(p=> p.status === "success");
    res.send(successDeposite.reverse())
  } catch (error) {
    res.send(error)
  }
}

// get reject deposite history
const rejectDepositeHistory = async (req, res) =>{
  try {
    const deposite = await Deposite.find({});
    let allDeposite = [];
    const depositeHistory = deposite.map( w=> w.history.map(h=> allDeposite = [...allDeposite, h]));
    const rejectDeposite = allDeposite.filter(p=> p.status === "reject");
  res.send(rejectDeposite.reverse())
  } catch (error) {
    res.send(error)
  }
}

// get All withdraw history
const allWithdrawHistory = async (req, res) =>{
  try {
    const withdraw = await Withdraw.find({});
    res.status(200).json({allWithdraw: withdraw})
  } catch (error) {
    res.send(error)
  }
}

// get success Withdraw history
const successWithdrawHistory = async (req, res) =>{
  try {
    const withdraw = await Withdraw.find({status: "success"});
    res.status(200).json({allWithdraw: withdraw})
  } catch (error) {
    res.send(error)
  }
}

// get reject withdraw history
const rejectWithdrawHistory = async (req, res) =>{
  try {
    const withdraw = await Withdraw.find({status: "reject"});
    res.status(200).json({allWithdraw: withdraw})
  } catch (error) {
    res.send(error)
  }
}

// get fund transfer report
const fundTransferReport = async (req, res) =>{
  try {
    const fundTransfer = await TransferFund.find({});
    let allFundTransfer = [];
    const fundTransferHistory = fundTransfer.map( w=> w.history.map(h=> allFundTransfer = [...allFundTransfer, h]));
    res.send(allFundTransfer.reverse())
  } catch (error) {
    res.send(error)
  }
}

// get Level income report
const levelIncomeData = async (req, res) =>{
  try {
    const levelIncome = await LevelIncome.find({});
    let allLevelIncome = [];
    const levelIncomeHistory = levelIncome.map( w=> w.level_income.map(h=> allLevelIncome = [...allLevelIncome, h]));
    res.send(allLevelIncome.reverse())
  } catch (error) {
    res.send(error)
  }
}

// get level Income
const getDirectLevelIncome = async (req, res) => {
  try {
    // const userId = req.params.user_id;
    const userId = req.auth.id;
    if (userId) {
      const levelIncome = await LevelIncome.find({type: "Direct"}).sort({createdAt: -1});
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
      const levelIncome = await LevelIncome.find({type: "Indirect"}).sort({createdAt: -1});
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


// Total invest
const totalInvest = async (req, res) =>{
  try {
    const topup = await Topup.find({});
    let allTopup = [];
    let totalInvest = 0;
    const topupHistory = topup.map( w=> w.history.map(h=> allTopup = [...allTopup, h]));
    allTopup.map(t=> totalInvest = parseFloat(totalInvest) + parseFloat(t.packages));
    res.send({
      total_invest: totalInvest
    })
  } catch (error) {
    res.send(error)
  }
}

// get Roi income data report
const roiIncomeData = async (req, res) =>{
 try {
  const roiIncome = await Roi.find({});
  let allRoiIncome = [];
  const roiIncomeHistory = roiIncome.map( w=> w.history.map(h=> allRoiIncome = [...allRoiIncome, h]));
  res.status(200).json(allRoiIncome.reverse())
 } catch (error) {
  //console.log(error)
  res.status(400).json({
    message: error.toString()
  })
 }
}

// send reward income
const sendReward = async (req, res)=>{
  try {
    const {amount, user_id, remark} = req.body;
    if(!amount){
      res.status(400).json({message: "Amount is missing."})
    }else if(!user_id){
      res.status(400).json({message: "User ID is missing."})
    }else if(!remark){
      res.status(400).json({message: "Remark is missing."})
    }else{
      // find user 
      const user = await User.findOne({user_id: user_id})
      // find wallet
      await Wallet.findOneAndUpdate({user_id: user_id},{
        $inc: {
          reward_income: + parseFloat(amount),
          total_income: + parseFloat(amount),
        }
      })
      // create reward document
      await RewardIncome.create({
        name: user.name,
        user_id: user.user_id,
        transaction_id: generateString(),
        amount: parseFloat(amount),
        type: "Reward Income",
        remark: remark,
        income_from: req.auth.id,
      })
      res.status(200).json({message: "Reward send successfully"})
    }
   } catch (error) {
    //console.log(error)
    res.status(400).json({
      message: error.toString()
    })
   }
}
// get reward income
const rewardIncomeData = async (_req, res)=>{
  try {
    const reardIncome = await RewardIncome.find({});
    res.status(200).json({reward: reardIncome})
   } catch (error) {
    //console.log(error)
    res.status(400).json({
      message: error.toString()
    })
   }
}

// Member delete
const deleteUser = async(req, res) =>{
  try {
    const {user_id} = req.body;
    const user = await User.findOneAndDelete({user_id: user_id});
    if(user){
      res.status(200).json({
        message: "Deleted successfully"
      })
    }else{
      res.status(400).json({
        message: "Cannot delete user"
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
}

// edit member
const editUser = async (req, res) =>{
  try {
    const {data} = req.body;
    const user = await User.findOneAndUpdate({user_id: data.user_id}, data);
    if(user){
      res.status(200).json({
        message: "Update user info successfully"
      })
    }else{
      res.status(400).json({
        message: "Cannot update user info"
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
}

// change deposite status
const changeDepositeStatus = async (req, res) =>{
  try {
    const {transaction_id, status} = req.body;
    const existingDeposite = await Deposite.findOneAndUpdate({'history':{$elemMatch: {transaction_id: transaction_id}}}                                                       
    ,{$set: {                                                                             
        'history.$[t].status':status,                             
    }},
    {
      "arrayFilters": [{ "t.transaction_id": transaction_id }] 
    }
  );
  if(existingDeposite){
    // let depositeDetails;
    const deposite = await Deposite.findOne({'history':{$elemMatch: {transaction_id: transaction_id}}});
    let allDeposite = [];
    const depositeHistory = deposite.history?.map( w=> allDeposite = [...allDeposite, w]);
    const targetDeposite = allDeposite.filter(p=> p.transaction_id === transaction_id);
    if(targetDeposite?.length > 0){
      const wallet = await Wallet.findOne({user_id: deposite.user_id});
      if(wallet){ 
        // if(targetDeposite.status === "pending"){
        //   const updateWallet = await Wallet.findOneAndUpdate({user_id: wallet.user_id}, {
        //     $set: {
        //       total_deposite: parseFloat(wallet.total_deposite) - parseFloat(targetDeposite[0]?.amount),
        //       topupable_balance: parseFloat(wallet.topupable_balance) - parseFloat(targetDeposite[0]?.amount),
        //     }
        //   })
        // }
        if(targetDeposite[0].status === "success"){
          const updateWallet = await Wallet.findOneAndUpdate({user_id: wallet.user_id}, {
            $set: {
              total_deposite: parseFloat(wallet.total_deposite) + parseFloat(targetDeposite[0]?.amount),
            }
          })
          // topupable_balance: parseFloat(wallet.topupable_balance) + parseFloat(targetDeposite[0]?.amount),
        }
        // if(targetDeposite.status === "cancel"){
        //   const updateWallet = await Wallet.findOneAndUpdate({user_id: wallet.user_id}, {
        //     $set: {
        //       total_deposite: parseFloat(wallet.total_deposite) - parseFloat(targetDeposite[0]?.amount),
        //       topupable_balance: parseFloat(wallet.topupable_balance) - parseFloat(targetDeposite[0]?.amount),
        //     }
        //   })
        // }
      }else{
        res.status(400).json({
          message: "Cannot find wallet"
        })
      }
    }
      res.status(200).json({
        message: "Update deposite status successfully"
      })
    }else{
      res.status(400).json({
        message: "Cannot update deposite status"
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
}

// change deposite status
const changeWithdrawStatus = async (req, res) =>{
  try {
    const {transaction_id, status} = req.body;
    // initial withdrawa
    const initialWithdraw = await Withdraw.findOne({transaction_id: transaction_id});
    if(initialWithdraw.status === "success" || initialWithdraw.status === "reject"){
      res.status(400).json({message: "You can't change status when it's already success or rejected"})
    }else if(initialWithdraw.status === "pending"){
      const ExistingWithdraw = await Withdraw.findOneAndUpdate({transaction_id: transaction_id}                                                       
        ,{$set: {                                                                             
            status: status,                             
        }}
      );
        if(ExistingWithdraw){
          const updatedWithdraw = await Withdraw.findOne({transaction_id: transaction_id});
          if(updatedWithdraw){
            // find wallet
            const wallet = await Wallet.findOne({user_id: updatedWithdraw.user_id});
            if(wallet){ 
              if(updatedWithdraw?.status === "success"){
                const sponsor = await User.findOne({user_id: updatedWithdraw?.sponsor_id})
                // update sponsor's wallet and admin wallet
                // find sponsor account
                const sponsorAcc = await User.findOne({user_id: updatedWithdraw?.sponsor_id});
                if(sponsorAcc.topup_status){
                  await Wallet.findOneAndUpdate({user_id: updatedWithdraw?.sponsor_id}, {
                    $inc: {
                      direct_withdraw_income: +(parseFloat(updatedWithdraw?.request_amount)*5) / 100,
                      total_income: +(parseFloat(updatedWithdraw?.request_amount)*5) / 100,
                    }
                  })
                  await DirectWithdrawIncome.create({
                    name: sponsor?.name,
                    user_id: sponsor?.user_id,
                    transaction_id: generateString(),
                    amount: (parseFloat(updatedWithdraw?.request_amount)*5) / 100,
                    type: "Direct Withdraw Income",
                    income_from: updatedWithdraw?.user_id,
                  })
                }

                // admin income or lost in system
                // await Wallet.findOneAndUpdate({user_id: "ADMIN"}, {
                //   $inc: {
                //     direct_withdraw_income: +(parseFloat(updatedWithdraw?.request_amount)*5) / 100,
                //     total_income: +(parseFloat(updatedWithdraw?.request_amount)*5) / 100,
                //   }
                // })
                // await DirectWithdrawIncome.create({
                //   name: "ADMIN",
                //   user_id: "ADMIN",
                //   transaction_id: generateString(),
                //   amount: (parseFloat(updatedWithdraw?.request_amount)*5) / 100,
                //   type: "Direct Withdraw Income",
                //   income_from: updatedWithdraw?.user_id,
                // })
              }
              if(updatedWithdraw?.status === "reject"){
                await Wallet.findOneAndUpdate({user_id: wallet.user_id}, {
                  $set: {
                    total_income: parseFloat(wallet.total_income) + parseFloat(updatedWithdraw?.request_amount),
                  }
                })
              }
            }else{
              res.status(400).json({
                message: "Cannot find wallet"
              })
            }
          }
          res.status(200).json({
            message: "Update withdraw status successfully"
          })
        }else{
          res.status(400).json({
            message: "Cannot update withdraw status"
          })
        }
    }else{
      res.status(400).json({message: "Something wrong. Please try again."})
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
}

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

// make topup
const makeTopup = async (req, res) => {
  try {
    // const {name, email, username, sponsor_id, position, amount } = req.body;
    const { user_id, packages, trx_password } = req.body;
    const userId = req.auth.id;
    // find user
    // if user ID is not there then send error
    if (!user_id || !packages) {
      res.status(400).json({message: "Please Enter all the Feilds"})
    }
      const user = await User.findOne({ user_id: user_id });
      const admin = await User.findOne({user_id: userId});
      const existingWallet = await Wallet.findOne({ user_id: user.user_id });
        if (user && trx_password === admin.trx_password) {
            // find existing Topup
            const existingTopup = await Topup.findOne({ user_id: user_id });
            if (existingTopup) {
              // Calculate current amount
              const date = new Date().toDateString();
              const status = "success";
              const updatedTopup = await Topup.findOneAndUpdate(
                { user_id: existingTopup?.user_id },
                {
                  $set: {
                    user: user._id,
                    packages: packages,
                    status: status,
                    history: [
                      {
                        user_id: user_id,
                        packages: packages,
                        status: status,
                        date: date,
                        transaction_id: generateString(15),
                      },
                      ...existingTopup.history,
                    ],
                  },
                }
                );
        
              // update user status
              const updatedUser = await User.updateOne(
                { _id: user._id },
                {
                  $set: {
                    topup_status: true,
                  },
                }
              );
              res.status(200).json({
                message: "Topup Successfull",
              });
            } else {
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
                  },
                ],
              });
              // create level income
              const levelIncome = await LevelIncome.create({
                name: user.name,
                user_id: user.user_id,
                email: user.email,
                sponsor_id: user.sponsor_id,
                level_income: [],
              });
              // update user status
              const updatedUser = await User.updateOne(
                { _id: user._id },
                {
                  $set: {
                    topup_status: true,
                    activation_date: new Date().getMilliseconds(),
                    topup_activation_date: new Date().toDateString()
                  },
                }
              );
              if (topup) {
                res.status(200).json({
                  message: "Topup successfull"
                });
              } else {
                res.status(400).send({
                  message: "Cannot make topup",
                });
              }
            }
            // update reward income
        
            // Update Sposnore Wallet
            const level1 = await Wallet.findOne({ user_id: existingWallet.sponsor_id });
            const level2 = await Wallet.findOne({ user_id: level1?.sponsor_id });
            const level3 = await Wallet.findOne({ user_id: level2?.sponsor_id });
            const level4 = await Wallet.findOne({ user_id: level3?.sponsor_id });
            const level5 = await Wallet.findOne({ user_id: level4?.sponsor_id });
            const level6 = await Wallet.findOne({ user_id: level5?.sponsor_id });
            const level7 = await Wallet.findOne({ user_id: level6?.sponsor_id });
            const level8 = await Wallet.findOne({ user_id: level7?.sponsor_id });
            const level9 = await Wallet.findOne({ user_id: level8?.sponsor_id });
            const level10 = await Wallet.findOne({ user_id: level9?.sponsor_id });
            const level11 = await Wallet.findOne({ user_id: level10?.sponsor_id });
            const level12 = await Wallet.findOne({ user_id: level11?.sponsor_id });
            const level13 = await Wallet.findOne({ user_id: level12?.sponsor_id });
            const level14 = await Wallet.findOne({ user_id: level13?.sponsor_id });
            const level15 = await Wallet.findOne({ user_id: level14?.sponsor_id });
            const level16 = await Wallet.findOne({ user_id: level15?.sponsor_id });
            const level17 = await Wallet.findOne({ user_id: level16?.sponsor_id });
            const level18 = await Wallet.findOne({ user_id: level17?.sponsor_id });
            const level19 = await Wallet.findOne({ user_id: level18?.sponsor_id });
            const level20 = await Wallet.findOne({ user_id: level19?.sponsor_id });
        
            // Update Sposnore level income
            const levelIncome1 = await LevelIncome.findOne({
              user_id: user.sponsor_id,
            });
            const levelIncome2 = await LevelIncome.findOne({
              user_id: levelIncome1?.sponsor_id,
            });
            const levelIncome3 = await LevelIncome.findOne({
              user_id: levelIncome2?.sponsor_id,
            });
            const levelIncome4 = await LevelIncome.findOne({
              user_id: levelIncome3?.sponsor_id,
            });
            const levelIncome5 = await LevelIncome.findOne({
              user_id: levelIncome4?.sponsor_id,
            });
            const levelIncome6 = await LevelIncome.findOne({
              user_id: levelIncome5?.sponsor_id,
            });
            const levelIncome7 = await LevelIncome.findOne({
              user_id: levelIncome6?.sponsor_id,
            });
            const levelIncome8 = await LevelIncome.findOne({
              user_id: levelIncome7?.sponsor_id,
            });
            const levelIncome9 = await LevelIncome.findOne({
              user_id: levelIncome8?.sponsor_id,
            });
            const levelIncome10 = await LevelIncome.findOne({
              user_id: levelIncome9?.sponsor_id,
            });
            const levelIncome11 = await LevelIncome.findOne({
              user_id: levelIncome10?.sponsor_id,
            });
            const levelIncome12 = await LevelIncome.findOne({
              user_id: levelIncome11?.sponsor_id,
            });
            const levelIncome13 = await LevelIncome.findOne({
              user_id: levelIncome12?.sponsor_id,
            });
            const levelIncome14 = await LevelIncome.findOne({
              user_id: levelIncome13?.sponsor_id,
            });
            const levelIncome15 = await LevelIncome.findOne({
              user_id: levelIncome14?.sponsor_id,
            });
            const levelIncome16 = await LevelIncome.findOne({
              user_id: levelIncome15?.sponsor_id,
            });
            const levelIncome17 = await LevelIncome.findOne({
              user_id: levelIncome16?.sponsor_id,
            });
            const levelIncome18 = await LevelIncome.findOne({
              user_id: levelIncome17?.sponsor_id,
            });
            const levelIncome19 = await LevelIncome.findOne({
              user_id: levelIncome18?.sponsor_id,
            });
            const levelIncome20 = await LevelIncome.findOne({
              user_id: levelIncome19?.sponsor_id,
            });
        
            updateLevelIncome(level1, levelIncome1, user.user_id, packages, 1);
            updateLevelIncome(level2, levelIncome2, user.user_id, packages, 2);
            updateLevelIncome(level3, levelIncome3, user.user_id, packages, 3);
            updateLevelIncome(level4, levelIncome4, user.user_id, packages, 4);
            updateLevelIncome(level5, levelIncome5, user.user_id, packages, 5);
            updateLevelIncome(level6, levelIncome6, user.user_id, packages, 6);
            updateLevelIncome(level7, levelIncome7, user.user_id, packages, 7);
            updateLevelIncome(level8, levelIncome8, user.user_id, packages, 8);
            updateLevelIncome(level9, levelIncome9, user.user_id, packages, 9);
            updateLevelIncome(level10, levelIncome10, user.user_id, packages, 10);
            updateLevelIncome(level11, levelIncome11, user.user_id, packages, 11);
            updateLevelIncome(level12, levelIncome12, user.user_id, packages, 12);
            updateLevelIncome(level13, levelIncome13, user.user_id, packages, 13);
            updateLevelIncome(level14, levelIncome14, user.user_id, packages, 14);
            updateLevelIncome(level15, levelIncome15, user.user_id, packages, 15);
            updateLevelIncome(level16, levelIncome16, user.user_id, packages, 16);
            updateLevelIncome(level17, levelIncome17, user.user_id, packages, 17);
            updateLevelIncome(level18, levelIncome18, user.user_id, packages, 18);
            updateLevelIncome(level19, levelIncome19, user.user_id, packages, 19);
            updateLevelIncome(level20, levelIncome20, user.user_id, packages, 20);
        }else {
              res.status(400).json({
                  message: "Invalid User ID or admin Transaction Password",
              });
          }     
  } catch (error) {
    //console.log(error)
    res.status(400).json({
      message: error.toString()
    })
  }
};

const createRoi = async (req, res) => {
  try {
    const { user_id, packages } = req.body;
    // const  user_id = req.auth.id;
  // if user email is not there then send error
  if (!user_id) {
    res.status(400).json(
      {message: "User ID not found"}
    )
  }

  const user = await User.findOne({user_id: user_id});

  let return_per_day;
  let total_days;
  if (parseFloat(packages) === 25) {
    return_per_day = 0.3;
    total_days = 600;
  } else {
    return_per_day = 0.5;
    total_days = 600;
  }

  // calculation for initial returns
  const return_amount = (return_per_day * parseFloat(packages)) / 100;
  const net_return = parseFloat(parseFloat(return_amount).toFixed(3)) * total_days;
  // save data to the database
  const newInvestment = await Roi.create({
    email: user.email,
    user_id,
    total_days,
    packages,
    return_per_day,
    current_day: 0,
    return_amount: parseFloat(parseFloat(return_amount).toFixed(3)),
    total_return: 0,
    net_return,
    // transaction_id: generateString(15),
    activation_status: true,
    history: []
  });

  if (newInvestment) {
    res.status(201).json({message: "ROI created successfully"});
  } else {
    res.status(400).json({message: "Can not create ROI"})
  }
  } catch (error) {
    //console.log(error)
    res.status(400).json({
      message: error.toString()
    })
  }
};

const stoproi=async (req,res)=>{
  const user_id=req.body.user_id;
  
  const newroi= await Roi.findOneAndUpdate({user_id:user_id},{
    activation_status:false},
    {
      new:true
    
  }
  )

  res.status(200).json(newroi);
}

const startroi=async (req,res)=>{
  const user_id=req.body.user_id;
  
  const newroi= await Roi.findOneAndUpdate({user_id:user_id},{
    activation_status:true},
    {
      new:true
    
  }
  )

  res.status(200).json(newroi);
}


const showroi=async (req,res)=>{
  const user_id=req.body.user_id;
  
  const newroi= await Roi.findOneAndUpdate({user_id:user_id},{
    display:true},
    {
      new:true
    
  }
  )

  res.status(200).json(newroi);
}


const hideroi=async (req,res)=>{
  const user_id=req.body.user_id;
  
  const newroi= await Roi.findOneAndUpdate({user_id:user_id},{
    display:false},
    {
      new:true
    
  }
  )

  res.status(200).json(newroi);
}
// Get all support ticket
const getAllSupportTicket = async (req, res) =>{
  try {
    const supportTicket = await SupportTicket.find({});
    let allSupport = [];
    const supportTicketHistory = supportTicket.map( w=> w.history.map(h=> allSupport = [...allSupport, h]));
    res.status(200).json(allSupport.reverse());
  } catch (error) {
    res.send(error)
  }
}

// get contact us messages
const getAllContactUs = async (req, res)=>{
  try {
    const contactUs = await Contact.find({});
    let allContactUs = [];
    const contactUsHistory = contactUs.map( w=> w.history.map(h=> allContactUs = [...allContactUs, h]));
    res.status(200).json(allContactUs.reverse());
  } catch (error) {
    res.send(error)
  }
}

// publish updates
const createUpdates = async (req, res) =>{
  try {
    const {title, description} = req.body;
    if(!req.body){
      res.status(400).json({
        message: "Please provide data"
      })
    }
    if(!title){
      res.status(400).json({
        message: "Title is missing"
      })
    }
    if(!description){
      res.status(400).json({
        message: "Description is missing"
      })
    }
    const newUpdates = await Update.create({
      title,
      description,
    })

    if(newUpdates){
      res.status(200).json({
        message: "New update published successfully"
      })
    }else{
      res.status(400).json({
        message: "Cannont create new update"
      })
    }

  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
}

const changePopUpImg = async (req, res) =>{
  try {
    if(!req.file?.path) res.status(400).json({
      message: "Image is missing",
    });
    const findImage = await PopupImage.findOne({image_id: "TLCPOPUPIMAGE"});
    if (findImage?.avatar_public_url) {
      await Cloudinary.uploader.destroy(findImage.avatar_public_url);
    }
    const image = await Cloudinary.uploader.upload(req.file.path);
    const avatar = {
      avatar: image.secure_url,
      avatar_public_url: image.public_id,
    };
    if(findImage){
    const upImage = await PopupImage.findOneAndUpdate({image_id: "TLCPOPUPIMAGE"}, {
      $set: {
        avatar: avatar.avatar,
        avatar_public_url: avatar.avatar_public_url
      }
    });
    if(upImage){
      res.status(200).json({ message: "Image uploaded" });
    }else{
      res.status(200).json({ message: "Cannot upload Image"});
    }
  }else{
    const upImage = await PopupImage.create({
        avatar: avatar.avatar,
        avatar_public_url: avatar.avatar_public_url
      }
    );
    if(upImage){
      res.status(200).json({ message: "Image uploaded" });
    }else{
      res.status(200).json({ message: "Cannot upload Image"});
    }
  }
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: error.message.toString() });
  }
}

const changeVideoLink = async (req, res) =>{
  try {
    if(!req.body.video_link) res.status(400).json({
      message: "Video link is missing",
    });
    const findVideo = await VideoData.findOne({video_id: "TLCPOPUPVIDEO"});
    if(findVideo){
    const upImage = await VideoData.findOneAndUpdate({image_id: "TLCPOPUPVIDEO"}, {
      $set: {
        video_link: req.body.video_link
      }
    });
    if(upImage){
      res.status(200).json({ message: "Video uploaded" });
    }else{
      res.status(200).json({ message: "Cannot upload video"});
    }
  }else{
    const upImage = await VideoData.create({
        video_link: req.body.video_link
      }
    );
    if(upImage){
      res.status(200).json({ message: "Video uploaded" });
    }else{
      res.status(200).json({ message: "Cannot upload Video"});
    }
  }
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: error.message.toString() });
  }
}


const getEligibleUserForGift = async (_req, res) =>{
  try {
    // all users
    const allUsers = await User.find({topup_status: true}).select(["-trx_password", "-password", "-token", "-team", "-email", "-mobile", "-role", "-verified", "-wallet_address", "-first_idx", "-second_idx", "-third_idx", "-fourth_idx", "-fifth_idx", "-VI_idx", "-VII_idx", "-VIII_idx", "-IX_idx", "-X_idx", "-XI_idx", "-XII_idx", "-XIII_idx", "-XIV_idx", "-XV_idx", "-XVI_idx", "-boost_idx"]);
    const eligibleUser = [];
    if(allUsers.length > 0){
      for(var i = 0; i < allUsers.length; i++){
        // get all downline users for specific user
        const allDownlineUsers = await User.find({$and: [{sponsor_id: allUsers[i].user_id}, {topup_status: true}]});
        // get already gifted array for specific user
        const giftedArr = await GiftedUser.findOne({user_id: allUsers[i]?.user_id});
        // console.log("gifted-----------Array", giftedArr)

        // filter new downline for count condition for gifting
        let recentDownline = [];
        for(var n = 0; n < allDownlineUsers.length; n++){
          if(!giftedArr?.history?.includes(allDownlineUsers[n].user_id)){
            recentDownline.push(allDownlineUsers[n].user_id)
          }
        }
        // console.log(`recent ------------ downline for ${allUsers[i].user_id} `,recentDownline, " ", recentDownline.length)
        // find day diffrence between current date and previous gifted date
        const Difference_In_Time =  new Date().getTime() - parseFloat(allUsers[i]?.gifted_date)
        const Difference_In_Days = parseFloat(Difference_In_Time) / (1000 * 3600 * 24);
        const Difference_In_Time_from_joining = new Date().getTime() - parseFloat(allUsers[i]?.join_date)
        const Difference_In_Days_from_joining = parseFloat(Difference_In_Time_from_joining) / (1000 * 3600 * 24);
        // condotions
        // initial
        if(allUsers[i]?.join_date === allUsers[i]?.gifted_date){
          // first 7 days gift
          if(Difference_In_Days_from_joining <= 7 && recentDownline?.length >= 4){
            console.log("enter 7 days cond")
            eligibleUser.push(allUsers[i])
          }
        }else{
          if(Difference_In_Days <= 30 && recentDownline?.length >= 4){
            eligibleUser.push(allUsers[i])
          }
        }
      }
    }
    res.status(200).json({eligibleUser})
  } catch (error) {
    console.log(error)
  }
}


const sendGiftAllEligibleUser = async(_req, res) =>{
    try {
      // all users
      const allUsers = await User.find({topup_status: true}).select(["-trx_password", "-password", "-token"]);
      if(allUsers.length > 0){
        for(var i = 0; i < allUsers.length; i++){
          // get all downline users for specific user
          const allDownlineUsers = await User.find({$and: [{sponsor_id: allUsers[i].user_id}, {topup_status: true}]});
          // get already gifted array for specific user
          const giftedArr = await GiftedUser.findOne({user_id: allUsers[i]?.user_id});
  
          // filter new downline for count condition for gifting
          let recentDownline = [];
          for(var n = 0; n < allDownlineUsers.length; n++){
            if(!giftedArr?.history?.includes(allDownlineUsers[n].user_id)){
              recentDownline.push(allDownlineUsers[n].user_id)
            }
          }
  
          // find day diffrence between current date and previous gifted date
          const Difference_In_Time =  new Date().getTime() - parseFloat(allUsers[i]?.gifted_date)
          const Difference_In_Days = parseFloat(Difference_In_Time) / (1000 * 3600 * 24);
          const Difference_In_Time_from_joining = new Date().getTime() - parseFloat(allUsers[i]?.join_date)
          const Difference_In_Days_from_joining = parseFloat(Difference_In_Time_from_joining) / (1000 * 3600 * 24);
  
          // condotions
          // initial
          if(allUsers[i]?.join_date === allUsers[i]?.gifted_date){
            // first 7 days gift
            if(Difference_In_Days_from_joining <= 7 && recentDownline?.length >= 4){
              //update gift array
              await GiftedUser.findOneAndUpdate({user_id: allUsers[i]?.user_id},{
                $set: {
                  gifted_date: new Date().getTime(),
                  history: [...giftedArr?.history, ...recentDownline]
                }
              });
              // add gift income document
              await GiftIncome.create({
                name: allUsers[i]?.name,
                user_id: allUsers[i]?.user_id,
                transaction_id: generateString(),
                amount: 10,
                type: "Gift",
                income_from: [...recentDownline],
              })
              // update gifted date in user collection
              await User.findOneAndUpdate({user_id: allUsers[i]?.user_id},{
                $set: {
                  gifted_date: new Date().getTime()
                }
              })
              // update wallet
              await Wallet.findOneAndUpdate({user_id: allUsers[i]?.user_id},{
                $inc: {
                  gift_income: +10,
                  total_income: +10
                }
              })
            }
            // res.status(200).json({message: "Gift send successfully"})
          }else{
            // next every 1 month gift
            if(Difference_In_Days <= 30 && recentDownline?.length >= 4){
              //update gift array
              await GiftedUser.findOneAndUpdate({user_id: allUsers[i]?.user_id},{
                $set: {
                  gifted_date: new Date().getTime(),
                  history: [...giftedArr?.history, ...recentDownline]
                }
              });
              // add gift income document
              await GiftIncome.create({
                name: allUsers[i]?.name,
                user_id: allUsers[i]?.user_id,
                transaction_id: generateString(),
                amount: 10,
                type: "Gift",
                income_from: [...recentDownline],
              })
              // update gifted date in user collection
              await User.findOneAndUpdate({user_id: allUsers[i]?.user_id},{
                $set: {
                  gifted_date: new Date().getTime()
                }
              })
              // update wallet
              await Wallet.findOneAndUpdate({user_id: allUsers[i]?.user_id},{
                $inc: {
                  gift_income: +10,
                  total_income: +10
                }
              })
            }
          }
        }
      }
      res.status(200).json({message: "Gift send successfully"})
    } catch (error) {
      console.log(error)
    }
}

const sendGiftSingleEligibleUser = async(req, res) =>{
  try {
    const userID = req.params.id;
    // all users
    const allUsers = await User.findOne({$and: [{user_id: userID}, {topup_status: true}]}).select(["-trx_password", "-password", "-token"]);
        // get all downline users for specific user
        const allDownlineUsers = await User.find({$and: [{sponsor_id: allUsers.user_id}, {topup_status: true}]});
        // {$and: [{ user_id: userId }, {type: "Direct"}]}
        // get already gifted array for specific user
        const giftedArr = await GiftedUser.findOne({user_id: allUsers.user_id});

        // filter new downline for count condition for gifting
        let recentDownline = [];
        for(var n = 0; n < allDownlineUsers.length; n++){
          if(!giftedArr?.history?.includes(allDownlineUsers[n].user_id)){
            recentDownline.push(allDownlineUsers[n].user_id)
          }
        }
        // console.log(`recent ------------ downline for ${allUsers.user_id} `,recentDownline, " ", recentDownline.length)
        // find day diffrence between current date and previous gifted date
        const Difference_In_Time =  new Date().getTime() - parseFloat(allUsers?.gifted_date)
        const Difference_In_Days = parseFloat(Difference_In_Time) / (1000 * 3600 * 24);
        const Difference_In_Time_from_joining = new Date().getTime() - parseFloat(allUsers?.join_date)
        const Difference_In_Days_from_joining = parseFloat(Difference_In_Time_from_joining) / (1000 * 3600 * 24);

        // condotions
        // initial
        if(allUsers.join_date === allUsers.gifted_date){
          // console.log("same as join date")
          // first 7 days gift
          if(Difference_In_Days_from_joining <= 7 && recentDownline?.length >= 4){
            // console.log("eligible for 7 days")
            //update gift array
            await GiftedUser.findOneAndUpdate({user_id: allUsers.user_id},{
              $set: {
                gifted_date: new Date().getTime(),
                history: [...giftedArr?.history, ...recentDownline]
              }
            });
            // console.log("update gifted user")
            // add gift income document
            await GiftIncome.create({
              name: allUsers.name,
              user_id: allUsers.user_id,
              transaction_id: generateString(),
              amount: 10,
              type: "Gift",
              income_from: [...recentDownline],
            })
            // console.log("update gift income")
            // update gifted date in user collection
            await User.findOneAndUpdate({user_id: allUsers.user_id},{
              $set: {
                gifted_date: new Date().getTime()
              }
            })
            // console.log("update gift date")
            // update wallet
            await Wallet.findOneAndUpdate({user_id: userID},{
              $inc: {
                gift_income: +10,
                total_income: +10
              }
            })
            // console.log("update wallet")
          }
        }else{
          // next every 1 month gift
          if(Difference_In_Days <= 30 && recentDownline?.length >= 4){
            // console.log("eligible for 30 days")
            //update gift array
            await GiftedUser.findOneAndUpdate({user_id: allUsers.user_id},{
              $set: {
                gifted_date: new Date().getTime(),
                history: [...giftedArr?.history, ...recentDownline]
              }
            });
            // console.log("update gifted user 30days")
            // add gift income document
            await GiftIncome.create({
              name: allUsers.name,
              user_id: allUsers.user_id,
              transaction_id: generateString(),
              amount: 10,
              type: "Gift",
              income_from: [...recentDownline],
            })
            // console.log("update gift income 30days")
            // update gifted date in user collection
            await User.findOneAndUpdate({user_id: allUsers.user_id},{
              $set: {
                gifted_date: new Date().getTime()
              }
            })
            // console.log("update gifted date 30days")
            // update wallet
            await Wallet.findOneAndUpdate({user_id: userID},{
              $inc: {
                gift_income: +10,
                total_income: +10
              }
            })
            // console.log("update wallet 30days")
          }
        }
    res.status(200).json({message: "Gift send successfully"})
  } catch (error) {
    console.log(error)
  }
}

const getALLGiftIncomeHistory = async(req, res)=>{
  try {
    const gitfIncome = await GiftIncome.find({});
    res.status(200).json({gift_income: gitfIncome}) 
  } catch (error) {
    console.log(error)
  }
}

const transferFundByAdmin = async(req, res)=>{
  try {
    const { receiver_id, amount } = req.body;
    const  user_id = req.auth.id;
  if (!user_id || !receiver_id || !amount) {
    res.status(400).json({
        message: "Please provide all data",
    });
  }else{
    const user = await User.findOne({ user_id: user_id });
    const receiverAccount = await User.findOne({ user_id: user_id });
  if (receiverAccount) {
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
                  charge: 0,
                  amount_after_charge: parseFloat(amount),
                  date: new Date().toDateString(),
                  status: "success",
                  transaction_id: generateString(15),
                  time: getIstTime(),
                },
              ],
            });
            if (newFundTransfer) {
              // find wallet
              const receiverWallet = await Wallet.findOne({
                user_id: receiver_id,
              });
                await Wallet.findOneAndUpdate(
                { user_id: receiver_id },
                {
                  $set: {
                    total_deposite:
                      parseFloat(receiverWallet.total_deposite) +
                      (parseFloat(amount)),
                  },
                  }
                );
                // // update sponsor's wallet
                // await Wallet.findOneAndUpdate({user_id: user?.sponsor_id},{
                //   $inc: {
                //     direct_fund_transfer_income: + ((parseFloat(amount) * 5) / 100),
                //     total_income: + ((parseFloat(amount) * 5) / 100)
                //   }
                // })
                // // update admin's wallet
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
                      charge: 0,
                      amount_after_charge: parseFloat(amount),
                      date: new Date().toDateString(),
                      transaction_id: generateString(15),
                      status: "success",
                      time: getIstTime(),
                    },
                  },
                }
              );
            if (updateExistingFundTransfer) {
              // find wallet
              const receiverWallet = await Wallet.findOne({
                user_id: receiver_id,
              });
              // update receiver wallet
              await Wallet.findOneAndUpdate(
                { user_id: receiver_id },
                {
                  $set: {
                    total_deposite:
                      parseFloat(receiverWallet.total_deposite) +
                      (parseFloat(amount)),
                  },
                }
              );
              // // update sponsor's wallet
              // await Wallet.findOneAndUpdate({user_id: user?.sponsor_id},{
              //   $inc: {
              //     direct_fund_transfer_income: + ((parseFloat(amount) * 5) / 100),
              //     total_income: + ((parseFloat(amount) * 5) / 100)
              //   }
              // })
              // // update admin's wallet
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
          message: "Invalid Receiver or Sender ID",
      });
    }
  }
  } catch (error) {
    res.status(400).json({
      message: error.toString()
    })
  }
}

const teamStatistics = async(req, res)=>{
  try {
    const {user_id} = req.body;
    // team
    // find team document 
    const levelTeam = await Level.findOne({ user_id: user_id }).populate({
      path: 'level.user',
      model: 'User',
      select: "topup_activation_date"
    });
    
    // total team
    const total_team = levelTeam?.level?.length;
    // direct active team
    const filterDirectActiveTeam = levelTeam?.level?.filter(a => a?.user?.topup_activation_date && a?.level === "1");
    const direct_active_team = filterDirectActiveTeam?.length;
    // total active team
    const filterTotalActiveTeam = levelTeam?.level?.filter(a => a?.user?.topup_activation_date);
    const total_active_team = filterTotalActiveTeam?.length;
    // level 1
    const level1 = levelTeam?.level?.filter(a =>a?.level === "1");
    const level2 = levelTeam?.level?.filter(a =>a?.level === "2");
    const level3 = levelTeam?.level?.filter(a =>a?.level === "3");
    const level4 = levelTeam?.level?.filter(a =>a?.level === "4");
    const level5 = levelTeam?.level?.filter(a =>a?.level === "5");
    const level6 = levelTeam?.level?.filter(a =>a?.level === "6");
    const level7 = levelTeam?.level?.filter(a =>a?.level === "7");
    const level8 = levelTeam?.level?.filter(a =>a?.level === "8");

    // monthly direct team
    const user = await User.findOne({$and:[{user_id: user_id}, {topup_status: true}]}).select(["-trx_password", "-password", "-token"]);
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

    // wallet
    const userWallet = await Wallet.findOne({user_id: user_id});

    res.status(200).json({
      user_id: levelTeam?.user_id,
      name: levelTeam?.name,
      total_team,
      direct_active_team,
      total_active_team,
      level1: level1?.length,
      level2: level2?.length,
      level3: level3?.length,
      level4: level4?.length,
      level5: level5?.length,
      level6: level6?.length,
      level7: level7?.length,
      level8: level8?.length,
      monthly_direct_team: recentDownline?.length,
      wallet: userWallet
    })
  } catch (error) {
    console.log(error)
  }
}

const adminFundtransfer = async(req, res)=>{
  try {
    const fundtransfer = await TransferFund.find({user_id: req.auth.id});

    res.status(200).json({fundtransfer});
  } catch (error) {
    console.log(error)
  }
}

const getDirectWithdrawIncome = async (req, res)=>{
  try {
    const DirectWithdraw = await DirectWithdrawIncome.find({});
    res.status(200).json(DirectWithdraw);
  } catch (error) {
    console.log(error)
  }
}

const changeAutopoolStatus = async(req, res)=>{
  try {
    const autopoolName = req.body.autopool_name;
    const autopoolStatus = req.body.autopool_status;
    await AutopoolSetting.findOneAndUpdate({autopool_name: autopoolName},{
      $set:{
        status: autopoolStatus
      }
    })
    res.status(200).json({message: "Autopool status changed successfully"})
  } catch (error) {
    console.log(error)
  }
}

const getAutopoolUser = async(req, res)=>{
  try {
    const allUsers = await User.find({ current_autopool: { $gt: 0 } });
    let autopoolUsers = []
    allUsers?.map(u=> autopoolUsers?.push(u?.user_id));

    res.status(200).json({users: autopoolUsers})
  } catch (error) {
    console.log(error)
  }
}

const autopoolTreeStructure = async(req, res)=>{
  try {
    const user_id = req.body.user_id;
    const autopoolModel = {
      2: AutopoolOne,
      2: AutopoolTwo,
      3: AutopoolThree,
      4: AutopoolFour,
      5: AutopoolFive,
      6: AutopoolSix,
      7: AutopoolSeven,
      8: AutopoolEight,
      9: AutopoolNine,
      10: AutopoolTen,
      11: AutopoolEleven,
      12: AutopoolTwelve,
      13:AutopoolThirteen,
      14:AutopoolFourteen,
      15: AutopoolFifteen,
      16: AutopoolSixteen,
    }
    let tree = []
    for(let i = 1; i < 17; i++){
      let doc = {
        user_id,
        autopool: i,
        level: 0,
        child: []
      }
      const level1pool = await autopoolModel[i].find({top1: user_id}).sort({createdAt: -1});
      for(let j = 0; j < level1pool?.length; j++){
        let level1Doc = {
          user_id: level1pool[j]?.user_id,
          level: 1,
          child: []
        }
        const level2pool = await autopoolModel[i].find({top1: level1pool[j]?.user_id}).sort({createdAt: -1});
        for(let k = 0; k < level2pool?.length; k++){
          let level2Doc = {
            user_id: level2pool[k]?.user_id,
            level: 2,
            child: []
          }
          level1Doc?.child?.push(level2Doc)
        }
        doc?.child?.push(level1Doc)
      }
      tree.push(doc)
    }

    res.status(200).json({autopoolTree: tree})
  } catch (error) {
    console.log(error)
  }
}

// create initial all autopool setting
// run this only once when server depoloy
const createAllAutopoolSeeting = async(req, res)=>{
  try {
    const value = [
      "autopool-one",
      "autopool-two",
      "autopool-three",
      "autopool-four",
      "autopool-five",
      "autopool-six",
      "autopool-seven",
      "autopool-eight",
      "autopool-nine",
      "autopool-ten",
      "autopool-eleven",
      "autopool-twelve",
      "autopool-thirteen",
      "autopool-fourteen",
      "autopool-fifteen",
      "autopool-sixteen",
    ]
    for(let i = 0; i < 16; i++){
      await AutopoolSetting.create({
        autopool_name: value[i],
        status: true,
      })
    }
    res.status(200).json({message: "autopool settings created succesfully"})
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllUser,
  getActiveUser,
  getBlockedUser,
  changeUserStatus,
  userAnalytics,
  activeUserCount,
  blockedUserCount,
  pendingWithdrawCount,
  completeWithdrawCount,
  allDepositeHistory,
  successDepositeHistory,
  rejectDepositeHistory,
  allWithdrawHistory,
  successWithdrawHistory,
  rejectWithdrawHistory,
  fundTransferReport,
  levelIncomeData,
  totalInvest,
  roiIncomeData,
  rewardIncomeData,
  deleteUser,
  editUser,
  changeDepositeStatus,
  changeWithdrawStatus,
  updateEmail,
  changePassword,
  makeTopup,
  getAllSupportTicket,
  getAllContactUs,
  createUpdates,
  createRoi,
  stoproi,
  startroi,
  showroi,
  hideroi,
  changePopUpImg,
  startautopool,
  stopautopool,
  startreward,
  stopreward,
  viewdisplayoptions,
  editdisplayoptions,
  getEligibleUserForGift,
  sendGiftAllEligibleUser,
  sendGiftSingleEligibleUser,
  getALLGiftIncomeHistory,
  getroyaltymembers,
  sendtoroyaltymembers,
  sendReward,
  transferFundByAdmin,
  getIndirectLevelIncome,
  getDirectLevelIncome,
  changeVideoLink,
  teamStatistics,
  adminFundtransfer,
  getDirectWithdrawIncome,
  changeAutopoolStatus,
  //
  createAllAutopoolSeeting,
  autopoolTreeStructure,
  getAutopoolUser,
};
