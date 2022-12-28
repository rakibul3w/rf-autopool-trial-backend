const express = require("express");
const { changePassword, getUserInfo, updateUserInfo, getRefferalInfo, updateEmail, changeTrxPassword, getLevelTeam, depositeAmount, depositeHistory,
     makeTopup, topupHistory, fundTransfer, transferFundHistory, withdrawAmount, withdrawHistory, getRewardIncome, getWallet, upLoadProofPic, updateProfilePic, updateTrxAddress, createSupportTicket, getSupportHistory,
       createContactUs, getContactUsHistory, getUpdates, levelIncomeChart, rewardIncomeChart,getautopoolData,autopooltopup,getautopoolchilddata,gettreeautopool,
       boosttopup,boostgettreeautopool,getautopoolupdatehistory,getcurrentautopool,getboosterhistory,getboostupdatehistory , royaltyincomehistory, getGiftIncomeHistory, getDirectLevelIncome, getIndirectLevelIncome, UserActivation, getDirectWithdrawIncome, getMonthlyDirectTeam, getDirectFundtransferIncome, getUserActivationIncome} = require("../../controllers/secureControllers");
const { verifyJWT, verifyUser } = require("../../middleware/authMiddleware");
const multer = require("../../middleware/multer");
const { updatePasswordValidationHandler, updatePasswordValidators, updateTrxPasswordValidators, updateTrxPasswordValidationHandler, updateEmailValidators, updateEmailValidationHandler, topupValidators, topupValidationHandler, fundTransferValidationHandler, fundTransferValidators, depositAmountValidators, depositAmountValidationHandler, withdrawAmountValidationHandler, withdrawAmountValidators, updateTxrAddressValidators, updateTxrAddressValidationHandler, supportTicketValidationHandler, supportTicketValidators, contactusValidationHandler, contactusValidators } = require("../../validation/inputValidation");

const router = express.Router();
const middleware = [verifyJWT, verifyUser]

router.use(middleware);


router.put("/change_password",updatePasswordValidators, updatePasswordValidationHandler, changePassword);
router.get("/get_user", getUserInfo);
router.put("/update_user_info", updateUserInfo);
router.get("/register/refferal", getRefferalInfo);
router.put("/update_email",updateEmailValidators, updateEmailValidationHandler, updateEmail);
router.post("/change_trx_password",updateTrxPasswordValidators, updateTrxPasswordValidationHandler, changeTrxPassword);
router.get("/level_team", getLevelTeam);

router.post("/deposite", multer.single("image"), depositeAmount);
router.get("/deposite_history", depositeHistory);
router.post("/make_topup",topupValidators,topupValidationHandler, makeTopup);
router.get("/topup_history", topupHistory);
router.post("/transfer_fund",fundTransferValidators, fundTransferValidationHandler, fundTransfer);
router.get("/transfer_fund_history", transferFundHistory);
router.get("/get_wallet/", getWallet);
router.post("/withdraw",withdrawAmountValidators, withdrawAmountValidationHandler, withdrawAmount);
router.get("/withdraw_history", withdrawHistory);
router.get("/direct_level_income", getDirectLevelIncome);
router.get("/indirec_tlevel_income", getIndirectLevelIncome);
router.get("/reward_income", getRewardIncome);

router.post("/upload_proof_pic", multer.single("image"), upLoadProofPic);
router.put("/update_profile_pic", multer.single("image"), updateProfilePic);
router.put("/update_trx_address",updateTxrAddressValidators, updateTxrAddressValidationHandler, updateTrxAddress);

router.post("/create_support", multer.single("image"), createSupportTicket);
router.get("/get_support_history", getSupportHistory);
router.post("/contactus_message",contactusValidators, contactusValidationHandler, createContactUs);
router.get("/get_contactus_history", getContactUsHistory);
router.get("/get_updates", getUpdates);
router.get("/level_income_chart", levelIncomeChart);
router.get("/reward_income_chart", rewardIncomeChart);
router.get("/getautopoolData/:id",getautopoolData);//to get autopool data

router.post("/make_autopool_topup",topupValidators,topupValidationHandler, autopooltopup);//to get autopool topup

router.post("/make_boost_topup",topupValidators,topupValidationHandler, boosttopup);//to get boost topup

router.get('/getautopool_history',getautopoolchilddata);
router.get('/booster_history',getboosterhistory)
router.get('/getautopool_update_history',getautopoolupdatehistory);
router.get('/boost_update_history',getboostupdatehistory);
router.get('/getcurrentautopool',getcurrentautopool);
router.get('/getroyaltyincomehistory', royaltyincomehistory);

router.get('/gift_income_history', getGiftIncomeHistory);
router.post('/user_activation', UserActivation);
router.get('/direct_withdraw_income', getDirectWithdrawIncome);
router.get('/monthly_direct_member', getMonthlyDirectTeam);
router.get('/direct_fundtransfer_income', getDirectFundtransferIncome);
router.get('/user_activation_income', getUserActivationIncome);





module.exports = router;