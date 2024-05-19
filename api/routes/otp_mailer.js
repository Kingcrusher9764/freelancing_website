const express = require("express")
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

const router = express.Router()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'tilak.tycs2024@gmail.com',
        pass: 'kcqk yupy cchn nnsg'
    }
});
async function GenerateOtp(mail) {
    var otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets:false });
    const info = await transporter.sendMail({
        from: '"OTP code for verification " <tilak.tycs2024@gmail.com>', // sender address
        to: mail, 
        subject: `OTP for freelance account`, // Subject line
        text: `OTP is: ${otp}`, // plain text body
        html: `<b>OTP is: ${otp}</b>`, // html body
    });
    return otp
}

router.post("/", async (req, res) => {
    var mail = req.body.mail
    if (mail) {
        try {
            var otp = await GenerateOtp(mail)
            res.json({ otp: otp, message: "OTP send Successfully" })
        }
        catch (err) {
            res.json({ message: "Email is not valid" })
        }
    } else {
        res.json({ message: "Email not provided" })
    }
})

module.exports = router
