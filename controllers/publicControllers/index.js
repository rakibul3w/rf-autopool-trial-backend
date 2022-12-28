const bcrypt = require("bcryptjs");
const User = require("../../models/userModel");
const Otp = require("../../models/otpModel");
const { generateToken } = require("../../config/generateToken");
const sendOtpMail = require("../../config/sendOtpMail");
const Level = require("../../models/levelModel");
const updateLevel = require("../../config/updateLevel");
const sendForgotPasswordMail = require("../../config/sendForgotPasswordMail");
const generateString = require("../../config/generateRandomString");
const sendConfrimRegistrationMail = require("../../config/sendConfrimRegisterMail");
const Wallet = require("../../models/walletModel");
const sendMessageEmail = require("../../config/sendMessageEmail");
 const firstautopool=require('../../models/firstautopoolmodel');
 const secondautopool=require('../../models/secondautopoolmodel');
 const thirdautopool=require('../../models/thirdautopoolmodel');
 const VIautopool=require('../../models/VIautopoolmodel');
 const fifthautopool=require('../../models/fifthautopoolmodel');
 const fourthautopool=require('../../models/fourthautopoolmodel');
const LevelIncome = require("../../models/levelIncomeModel");
const GiftedUser = require("../../models/giftedUserModel");
const VideoData = require("../../models/videoModel");





const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile, sponsor_id, sponsor_name, otpCode } =
      req.body;
    let initialTrx = generateString(12);
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Fields");
    }
    let randomUserId;

    const allUser = await User.find({});
    const lastUserID = allUser[allUser.length - 1]?.user_id.split("RF")[1];
    if (lastUserID) {
      randomUserId = "RF00" + (parseFloat(lastUserID) + 1);
    } else if (allUser.length === 1) {
      randomUserId = "RF001";
    } else {
      randomUserId = "RF00" + (allUser.length + 1);
    }

    //console.log("random ID", randomUserId);
    const userExists = await User.findOne({ email: email });
    const otp = await Otp.findOne({ email: email });

    if (!userExists) {
      if (otpCode && parseFloat(otp?.code) === parseFloat(otpCode)) {
        const creentDate = new Date().getTime();
        const user = await User.create({
          name: name,
          user_id: randomUserId,
          email: email,
          password: password,
          mobile: mobile,
          sponsor_id: sponsor_id,
          sponsor_name: sponsor_name,
          token: generateToken(randomUserId),
          trx_password: initialTrx,
          wallet_address: "",
          gifted_date: creentDate,
          join_date: creentDate,
        });
        if (user) {
          // delete Otp
          if (otpCode) {
            await Otp.deleteOne({ email: user.email });
          }
           
         

          // send successfull email
          sendConfrimRegistrationMail(user, initialTrx, user.user_id);

          // create wallet
          await Wallet.create({
              user_id: user.user_id,
              sponsor_id: sponsor_id,
              derect_income: 0,
              inderect_income: 0,
              direct_fund_transfer_income: 0,
              direct_withdraw_income: 0,
              autopool_income: 0,
              reward_income: 0,
              gift_income: 0,
              user_activation_income: 0,
              current_amount: 0,
              total_income: 0,
              total_deposite: 0,
              total_withdraw: 0,
              wallet_address: "",
          });

          await GiftedUser.create({
            user_id: user.user_id,
            user_name: user.name,
            history: [],
            join_date: new Date().getTime(),
          })

          // create level new for user
          await Level.create({
            name: user.name,
            user_id: user.user_id,
            email: user.email,
            sponsor_id: user.sponsor_id,
            level: [],
          });
          const level1 = await Level.findOne({ user_id: user.sponsor_id });
          const level2 = await Level.findOne({ user_id: level1?.sponsor_id });
          const level3 = await Level.findOne({ user_id: level2?.sponsor_id });
          const level4 = await Level.findOne({ user_id: level3?.sponsor_id });
          const level5 = await Level.findOne({ user_id: level4?.sponsor_id });
          const level6 = await Level.findOne({ user_id: level5?.sponsor_id });
          const level7 = await Level.findOne({ user_id: level6?.sponsor_id });
          const level8 = await Level.findOne({ user_id: level7?.sponsor_id });
          
          // Update Level 1
          if (level1) {
            updateLevel(level1, user, 1);
            // // update sponsor's dirrect income
            // await LevelIncome.create({
            //   name: level1?.name,
            //   user_id: level1?.user_id,
            //   email: level1?.sponsor_id,
            //   transaction_id: generateString(),
            //   amount: 20,
            //   type: "Direct",
            //   income_from: randomUserId,
            // })
            // await Wallet.findOneAndUpdate({
            //   user_id: level1?.user_id
            // },{
            //   $inc: {
            //     direct_income: +20,
            //     total_income: +20,
            //   }
            // })
          }
          // update level 2
          if (level2) {
            updateLevel(level2, user, 2);
            // // update sponsor's indirrect income
            // await LevelIncome.create({
            //   name: level2?.name,
            //   user_id: level2?.user_id,
            //   email: level2?.sponsor_id,
            //   transaction_id: generateString(),
            //   amount: 2,
            //   type: "Indirect",
            //   income_from: randomUserId,
            // })
            // await Wallet.findOneAndUpdate({
            //   user_id: level2?.user_id
            // },{
            //   $inc: {
            //     indirect_income: +2,
            //     total_income: +2,
            //   }
            // })
          }
          
          // update level 3
          if (level3) {
            updateLevel(level3, user, 3);
            // // update sponsor's indirrect income
            // await LevelIncome.create({
            //   name: level3?.name,
            //   user_id: level3?.user_id,
            //   email: level3?.sponsor_id,
            //   transaction_id: generateString(),
            //   amount: 2,
            //   type: "Indirect",
            //   income_from: randomUserId,
            // })
            // await Wallet.findOneAndUpdate({
            //   user_id: level3?.user_id
            // },{
            //   $inc: {
            //     indirect_income: +2,
            //     total_income: +2,
            //   }
            // })
          }
          // update level 4
          if (level4) {
            updateLevel(level4, user, 4);
            // update sponsor's indirrect income
            // await LevelIncome.create({
            //   name: level4?.name,
            //   user_id: level4?.user_id,
            //   email: level4?.sponsor_id,
            //   transaction_id: generateString(),
            //   amount: 2,
            //   type: "Indirect",
            //   income_from: randomUserId,
            // })
            // await Wallet.findOneAndUpdate({
            //   user_id: level4?.user_id
            // },{
            //   $inc: {
            //     indirect_income: +2,
            //     total_income: +2,
            //   }
            // })
          }
          // update level 5
          if (level5) {
            updateLevel(level5, user, 5);
            // // update sponsor's indirrect income
            // await LevelIncome.create({
            //   name: level5?.name,
            //   user_id: level5?.user_id,
            //   email: level5?.sponsor_id,
            //   transaction_id: generateString(),
            //   amount: 1,
            //   type: "Indirect",
            //   income_from: randomUserId,
            // })
            // await Wallet.findOneAndUpdate({
            //   user_id: level5?.user_id
            // },{
            //   $inc: {
            //     indirect_income: +1,
            //     total_income: +1,
            //   }
            // })
          }
          // Update Level 6
          if (level6) {
            updateLevel(level6, user, 6);
            // // update sponsor's indirrect income
            // await LevelIncome.create({
            //   name: level6?.name,
            //   user_id: level6?.user_id,
            //   email: level6?.sponsor_id,
            //   transaction_id: generateString(),
            //   amount: 1,
            //   type: "Indirect",
            //   income_from: randomUserId,
            // })
            // await Wallet.findOneAndUpdate({
            //   user_id: level6?.user_id
            // },{
            //   $inc: {
            //     indirect_income: +1,
            //     total_income: +1,
            //   }
            // })
          }
          // update level 7
          if (level7) {
            updateLevel(level7, user, 7);
            // // update sponsor's indirrect income
            // await LevelIncome.create({
            //   name: level7?.name,
            //   user_id: level7?.user_id,
            //   email: level7?.sponsor_id,
            //   transaction_id: generateString(),
            //   amount: 1,
            //   type: "Indirect",
            //   income_from: randomUserId,
            // })
            // await Wallet.findOneAndUpdate({
            //   user_id: level7?.user_id
            // },{
            //   $inc: {
            //     indirect_income: +1,
            //     total_income: +1,
            //   }
            // })
          }
          // update level 8
          if (level8) {
            updateLevel(level8, user, 8);
            // // update sponsor's indirrect income
            // await LevelIncome.create({
            //   name: level8?.name,
            //   user_id: level8?.user_id,
            //   email: level8?.sponsor_id,
            //   transaction_id: generateString(),
            //   amount: 1,
            //   type: "Indirect",
            //   income_from: randomUserId,
            // })
            // await Wallet.findOneAndUpdate({
            //   user_id: level8?.user_id
            // },{
            //   $inc: {
            //     indirect_income: +1,
            //     total_income: +1,
            //   }
            // })
          }
          res.status(201).json({
            message: "Registration successfull",
          });

          
        } else {
          res.status(400).json({ message: "Invalid credintial" });
        }
      } else {
        res.status(400).json({
          message: "Invalid OTP",
        });
      }
    } else {
      res.status(400).json({
        message: "User Already Exists",
      });
    }
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      message: error.toString(),
    });
  }
};

// User Login
const authUser = async (req, res) => {
  try {
    const { user_id, password } = req.body;
    if (!user_id || !password) {
      res.status(400).json({
        message: "Please Enter all the Feilds",
      });
    }

    const user = await User.findOne({ user_id: user_id });
      if (user && (await user.matchPassword(password))) {
        res.status(200).json({
          message: "Login successfull",
          token: generateToken(user_id),
        });
      } else {
        res.status(400).json({
          message: "Invalid username or password",
        });
      }
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      message: error.toString(),
    });
  }
};

// Get Sponsor Name
const getSponsorName = async (req, res) => {
  const userId = req.params.user_id;

  const user = await User.findOne({ user_id: userId });

  if (user) {
    res.status(200).json({
      name: user.name,
    });
  } else {
    res.status(400).json({
      message: "Invalid user ID",
    });
  }
};

// Send Otp
const sendOtp = async (req, res) => {
  try {
    const {
      email, // this for register, change password, change trx password
      user_id, // this for login
      password, // this for login
      new_email,
      mobile,
      current_password,
      current_trx_password,
      trx_address,
      trx_password,
    } = req.body;
    ////console.log("opoppoop")
    const Otpcode = Math.floor(1000 + Math.random() * 9000); // Generate OTP code
    const expireTime = new Date().getTime() + 300 * 1000; // create expire time
    // for login user
    //console.log(Otpcode)
    //console.log("opoppoop")
    if (user_id && !trx_address && !trx_password) {
      const user = await User.findOne({ user_id: user_id });
      if (user && (await user.matchPassword(password))) {
        if (user.user_status) {
          // delete previous Otp
          
          if (user.email) {
            const existingOtp = Otp.findOne({ email: user.email });
            if (existingOtp) {
              await Otp.deleteOne({ email: user.email });
            }
            // Save otp on database
            const newOtp = await Otp.create({
              email: user.email,
              user_id: user.user_id,
              code: Otpcode,
              expireIn: expireTime,
            });

            if (newOtp) {
              sendOtpMail(newOtp.email, newOtp.code);
               return res.status(200).json({
                message: "OTP sent on your email",
              });
            } else {
              return res.status(400).json({
                message: "Can not send OTP",
              });
            }
          }
        } else {
          return res.status(400).json({
            message: "You have been blocked",
          });
        }
      } else {
        return res.status(400).json({
          message: "Invalid credential",
        });
      }
    }
    // withdraw
    if (user_id && trx_address && trx_password) {
      const user = await User.findOne({ user_id: user_id });
      if (user) {
        if(user.wallet_address === trx_address){
            if(user.trx_password === trx_password){
            if (user.email) {
              const existingOtp = Otp.findOne({ email: user.email });
              if (existingOtp) {
                await Otp.deleteOne({ email: user.email });
              }
              // Save otp on database
              const newOtp = await Otp.create({
                email: user.email,
                user_id: user.user_id,
                code: Otpcode,
                expireIn: expireTime,
              });
  
              if (newOtp) {
                sendOtpMail(newOtp.email, newOtp.code);
                 return res.status(200).json({
                  message: "OTP sent on your email",
                });
              } else {
                return res.status(400).json({
                  message: "Can not send OTP",
                });
              }
            }
          }else{
            res.status(400).json({
              message: "Invalid trx password",
            });
          }
        }else{
          res.status(400).json({
            message: "Invalid trx address",
          });
        }
      } else {
        return res.status(400).json({
          message: "Invalid user credential",
        });
      }
    }
    // for register user
    if (email && mobile) {
      const emailExist = await User.findOne({ email: email });
      if (emailExist) {
        return res.status(400).json({
          message: "Email already exist",
        });
      }
      const mobileExist = await User.findOne({ mobile: mobile });
      if (mobileExist) {
        return  res.status(400).json({
          message: "Mobile already exist",
        });
      }

      if (!emailExist && !mobileExist) {
        const existingOtp = Otp.findOne({ email: email });
        if (existingOtp) {
          await Otp.deleteOne({ email: email });
        }
        // Save otp on database
        const newOtp = await Otp.create({
          email: email,
          code: Otpcode,
          expireIn: expireTime,
        });

        if (newOtp) {
          //console.log(newOtp)
          sendOtpMail(newOtp.email, newOtp.code);
          return res.status(200).json({
            message: "OTP sent on your email",
          });
        } else {
          return res.status(400).json({
            message: "Can not send OTP",
          });
        }
      }
    }
    // for change password
    if (email && current_password) {
      const user = await User.findOne({ email: email });
      if (user && (await user.matchPassword(current_password))) {
        const existingOtp = Otp.findOne({ email: user.email });
        if (existingOtp) {
          await Otp.deleteOne({ email: user.email });
        }
        // Save otp on database
        const newOtp = await Otp.create({
          email: email,
          code: Otpcode,
          expireIn: expireTime,
        });

        if (newOtp) {
          sendOtpMail(newOtp.email, newOtp.code);
          return res.status(200).json({
            message: "OTP sent on your email",
          });
        } else {
          return res.status(400).json({
            message: "Can not send OTP",
          });
        }
      } else {
        return res.status(400).json({
          message: "Incorrect current password",
        });
      }
    }
    // for change transaction password
    if (email && current_trx_password) {
      const existTrxPassword = await User.findOne({
        trx_password: current_trx_password,
      });
      if (existTrxPassword) {
        const existingOtp = Otp.findOne(existTrxPassword.email);
        if (existingOtp) {
          await Otp.deleteOne({ email: existTrxPassword.email });
        }
        // Save otp on database
        const newOtp = await Otp.create({
          email: email,
          code: Otpcode,
          expireIn: expireTime,
        });

        if (newOtp) {
          sendOtpMail(newOtp.email, newOtp.code);
          return res.status(200).json({
            message: "OTP sent on your email",
          });
        } else {
          return res.status(400).json({
            message: "Can not send OTP",
          });
        }
      } else {
        return res.status(400).json({
          message: "Incorrect current trx password",
        });
      }
    }
    // for change email
    if (email && new_email) {
      const existEmail = await User.findOne({ email: email });
      const existNewEmail = await User.findOne({ email: new_email });
      if (existEmail) {
        const existingOtp = Otp.findOne({ email: existEmail.email });
        if (existingOtp) {
          await Otp.deleteOne({ email: existEmail.email });
        }
        if (existNewEmail) {
          res.status(400).json({
            message: "Email already exist",
          });
        } else {
          // Save otp on database
          const newOtp = await Otp.create({
            email: new_email,
            code: Otpcode,
            expireIn: expireTime,
          });

          if (newOtp) {
            sendOtpMail(newOtp.email, newOtp.code);
            return res.status(200).json({
              message: "OTP sent on your email",
            });
          } else {
            return res.status(400).json({
              message: "Can not send OTP",
            });
          }
        }
      } else {
        return res.status(400).json({
          message: "Incorrect current email",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

// Send Forgot password link Mail
const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({
        message: "Please Put email",
      });
    } else {
      const user = await User.findOne({ email: email });
      if (user) {
        let newToken = generateToken(user.user_id);
        const updateUser = await User.findByIdAndUpdate(
          { _id: user._id },
          {
            $set: {
              token: newToken,
            },
          },
          { new: true }
        );
        if (updateUser) {
          sendForgotPasswordMail(updateUser.email, updateUser.token);
          res.status(200).json({
            message: "Forgot password email sent successfully",
          });
        } else {
          res.status(400).json({
            message: "Something wrong",
          });
        }
      } else {
        res.status(400).json({
          message: "User doesn't exist",
        });
      }
    }
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      message: error.toString(),
    });
  }
};

// reset Password
const resetPassord = async (req, res) => {
  try {
    const tokenId = req.params.token;
    const { password } = req.body;
    if (tokenId) {
      const user = await User.findOne({ token: tokenId });
      if (user) {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const update_password = await User.updateOne(
          { _id: user._id },
          {
            $set: {
              password: encryptedPassword,
            },
          }
        );
        if (update_password) {
          res.status(200).json({
            message: "Password Updated",
          });
        }
      } else {
        res.status(400).json({
          message: "User doesn't exist",
        });
      }
    } else {
      res.status(400).json({
        message: "Token missing or invalid",
      });
    }
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      message: error.toString(),
    });
  }
};

// check mobile number
const checkMobileNumber = async (req, res) => {
  try {
    const mobile = req.params.mobile;
    if (!mobile) {
      res.status(400).json({
        message: "Please fill mobile number feild",
      });
    } else {
      const user = await User.findOne({ mobile: mobile });
      if (user) {
        res.status(400).json({
          message: "Mobile number taken",
        });
      } else {
        res.status(200).json({
          message: "Mobile number available",
        });
      }
    }
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      message: error.toString(),
    });
  }
};

// check email number
const checkEmail = async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) {
      res.status(400).json({
        message: "Please fill email feild",
      });
    } else {
      const user = await User.findOne({ email: email });
      if (user) {
        res.status(400).json({
          message: "Email taken",
        });
      } else {
        res.status(200).json({
          message: "Available email",
        });
      }
    }
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      message: error.toString(),
    });
  }
};

// check email number
const checkSponsorId = async (req, res) => {
  try {
    const sponsor_id = req.params.sponsor_id;
    if (!sponsor_id) {
      res.status(400).json({
        message: "Please fill sponsor id feild",
      });
    } else {
      const user = await User.findOne({ user_id: sponsor_id });
      if (user) {
        res.status(200).json({
          sponsor_name: user.name,
          message: "Valid sponsor id",
        });
      } else {
        res.status(400).json({
          message: "Invalid sponsor id",
        });
      }
    }
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      message: error.toString(),
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { name, user_id, email, message, subject, mobile } = req.body;
    if (!name) {
      res.status(400).json({
        message: "Name is missing",
      });
    }
    if (!user_id) {
      res.status(400).json({
        message: "User ID is missing",
      });
    }
    if (!email) {
      res.status(400).json({
        message: "Email is missing",
      });
    }
    if (!message) {
      res.status(400).json({
        message: "Message is missing",
      });
    }
    if (!subject) {
      res.status(400).json({
        message: "Subject is missing",
      });
    }
    if (!mobile) {
      res.status(400).json({
        message: "Mobile is missing",
      });
    }
    if (name && user_id && email && message && subject && mobile) {
      sendMessageEmail(name, user_id, email, message, subject, mobile);
      res.status(200).json({
        message: "Message sent successfully",
      });
    } else {
      res.status(400).json({
        message: "Cannot send message",
      });
    }
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      message: error.toString(),
    });
  }
};


const getVideoLink = async(_req, res)=>{
  try {
    const link = await VideoData.findOne({video_id: "TLCPOPUPVIDEO"}).select(["-video_id"])
    if(link){
      res.status(200).json(link)
    }else{
      res.status(400).json({message: "can't get any data"})
    }
  } catch (error) {
    return res.status(500).json({ message: error.message.toString() });
  }
}

module.exports = {
  registerUser,
  authUser,
  sendOtp,
  getSponsorName,
  ForgotPassword,
  resetPassord,
  checkMobileNumber,
  checkEmail,
  checkSponsorId,
  sendMessage,
  getVideoLink,
};
