const nodemailer = require('nodemailer');

const sendOtpMail = (email, otp)=>{
    let transpoter = nodemailer.createTransport({
        service: 'Gmail',
        port: 587,
        secure: false,
        auth: {
            user: "rakibul@triplewsols.org",
            pass: "dymnjnvqidgdtyxq"
        }
    });
console.log(otp)
    let mailOption = {
        from: "rakibul@triplewsols.org",
        to: email,
        subject: 'OTP Code',
        html: `<div>
        <p>Here is your OTP code: ${otp}</p>
        <br />
        <p>Regards,</p>
        <p><a href="https://rightfuture.in/">rightfuture.in</a></p>
    </div>`
    };

    transpoter.sendMail(mailOption, async (error, info)=>{
        if(error){
            //console.log(error);
        }else{
            //console.log("Email sent: " + info.response);
        }
    });
}

module.exports = sendOtpMail;