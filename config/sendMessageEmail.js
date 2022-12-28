const nodemailer = require('nodemailer');

const sendMessageEmail = (name, user_id, email, message, subject, mobile)=>{
    let transpoter = nodemailer.createTransport({
        service: 'Gmail',
        port: 587,
        secure: false,
        auth: {
            user: "rakibul@triplewsols.org",
            pass: "dymnjnvqidgdtyxq"
        }
    });

    let messageBody = `<div>
        <p>${message}</p>
        <br />
        <p>${name}</p>
        <p>${email}</p>
        <p>${user_id}</p>
        <p>${mobile}</p>
    </div>`

    let mailOption = {
        from: email,
        to: "rakibul@triplewsols.org",
        subject: subject,
        html: messageBody
    };

    transpoter.sendMail(mailOption, async (error, info)=>{
        if(error){
            //console.log(error);
        }else{
            //console.log("Email sent: " + info.response);
        }
    });
}

module.exports = sendMessageEmail;