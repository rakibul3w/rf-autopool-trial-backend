const nodemailer = require('nodemailer');

const sendForgotPasswordMail = (email, token)=>{
    const reset_password_url = `https://tronlive.club/resetpassword/${token}`
    let transpoter = nodemailer.createTransport({
        service: 'Gmail',
        port: 587,
        secure: false,
        auth: {
            user: "rakibul@triplewsols.org",
            pass: "dymnjnvqidgdtyxq"
        }
    });

    let mailOption = {
        from: "rakibul@triplewsols.org",
        to: email,
        subject: 'Forgot Password',
        text: `Go to this link to reset password ${reset_password_url}`
    };

    transpoter.sendMail(mailOption, async (error, info)=>{
        if(error){
            //console.log(error);
        }else{
            //console.log("Email sent: " + info.response);
        }
    });
}

module.exports = sendForgotPasswordMail;