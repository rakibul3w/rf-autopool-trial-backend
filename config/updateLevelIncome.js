const LevelIncome = require("../models/levelIncomeModel");
const Wallet = require("../models/walletModel");
const generateString = require("./generateRandomString");
const getIstTime = require("./getTime");

const updateLevelIncome = async (
  sponsorWallet,
  sponsorLevelIncome,
  userId,
  package,
  levelnumber
) => {

  //here we update sponserwallet an dsponser level income
  let bonus;

  const getDateTime = getIstTime();

  if (parseFloat(levelnumber) === 1) {
    bonus = (parseFloat(package) * 20) / 100;
  }
  if (parseFloat(levelnumber) >= 2 && parseFloat(levelnumber) <= 10) {
    bonus = (parseFloat(package) * 2) / 100;
  }
  if (parseFloat(levelnumber) >= 11 && parseFloat(levelnumber) <= 20) {
    bonus = (parseFloat(package) * 1) / 100;
  }

  // ROI
  //level income 

  let totalNetReturn = 0;
  let currentBonus = 0;

  // const roi = await Roi.find({ user_id: sponsorLevelIncome?.user_id });

  // const roiIncomeHistory = roi.find( w=> w.activation_status === true);

  // const roiActive = roi.filter(r=> r.activation_status === true)
  // roiActive.map(r=> totalNetReturn = totalNetReturn + parseFloat(r.net_return))

    if (sponsorLevelIncome) {
      if(parseFloat(sponsorWallet.level_income) + parseFloat(bonus) < totalNetReturn){
        currentBonus = bonus;
      }else{
        currentBonus = (parseFloat(totalNetReturn) - parseFloat(sponsorWallet.level_income));
      }
      const updateSponsorIncome = await LevelIncome.findOneAndUpdate(
        { user_id: sponsorLevelIncome.user_id },
        {
          $push: {
            level_income: {
              user_id: userId,
              sponsor_id: sponsorLevelIncome.user_id,
              date: new Date().toDateString(),
              amount: currentBonus,
              level: levelnumber,
              transaction_id: generateString(15),
              time: getDateTime.time,
            },
          },
        }
      );
      // await updateSponsorIncome.save();
    }

    if (sponsorWallet) {
      const updateSponsorWallet = await Wallet.findOneAndUpdate(
        { user_id: sponsorWallet.user_id },
        {
          $set: {
            level_income: parseFloat(sponsorWallet.level_income) + currentBonus,
            total_income: parseFloat(sponsorWallet.total_income) + currentBonus,
          },
        }
        );
        // current_amount: parseFloat(sponsorWallet.current_amount) + bonus,
        // topupable_balance: parseFloat(sponsorWallet.topupable_balance) + bonus,
        // withdrawable_balance: parseFloat(sponsorWallet.withdrawable_balance) + bonus,
      // await updateSponsorWallet.save();
    }
  
};

module.exports = updateLevelIncome;
