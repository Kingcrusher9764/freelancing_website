const express = require("express")
const nodemailer = require("nodemailer");
const User = require("./../models/userModel")

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'tilak.tycs2024@gmail.com',
        pass: 'kcqk yupy cchn nnsg'
    }
});

router = express.Router()

async function sendImage(mail, url) {
    const info = await transporter.sendMail({
        from: '"Payment image send checking" <tilak.tycs2024@gmail.com>', // sender address
        to: mail, // list of receivers
        subject: `Image of payment`, // Subject line
        text: `Verify that the image is correct: ${url}`, // plain text body
        html: `<a href=${url}>Image link</a>`, // html body
    });
    // console.log("Message sent: %s", info.messageId);
}

router.post("/", async (req, res) => {

    var user = await User.findOne({ _id: req.body.sellerId })
    var mail = user.email
    console.log(mail)
    var url = req.body.url
    if (mail && url) {
        try {
            await sendImage(mail, url)
            res.json({ message: "Image send Successfully" })
        }
        catch (err) {
            res.json({ message: "Email is not valid" })
        }
    } else {
        res.json({ message: "image is not provided" })
    }
})

module.exports = router