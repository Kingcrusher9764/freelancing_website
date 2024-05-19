// const fs = require('fs');
const QRCode = require('qrcode');

// Function to generate and save QR code
async function generateAndSaveQRCode(data) {
    try {
        // Generate QR code
        const qrCodeDataUrl = await QRCode.toDataURL(data);
        console.log(qrCodeDataUrl)
        // Write QR code to file
        // const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
        // fs.writeFileSync(filePath, base64Data, 'base64');

        // console.log('QR Code generated and saved successfully!');
    } catch (error) {
        console.error('Error generating QR Code:', error);
    }
}

upi = "saiketdebnath53@oksbi"
Sname = "SaiketDebnath"
money = 100
generateAndSaveQRCode(`upi://pay?pa=${upi}&pn=${Sname}&tn=TestingGpay&am=${money}&cu=INR`)
// Example usage
// const data = 'Hello, world!'; // Data to encode in the QR code
// const filePath = 'qrcode.png'; // Path where QR code will be saved

// generateAndSaveQRCode(data, filePath);


// const otpGenerator = require('otp-generator')
// const nodemailer = require("nodemailer")

// // const transporter = nodemailer.createTransport({
// //     host: 'smtp.ethereal.email',
// //     port: 587,
// //     auth: {
// //         user: 'oleta.erdman@ethereal.email',
// //         pass: 'vFrwRBUBxV5cDpvczQ'
// //     }
// // });
// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     auth: {
//         user: 'tilak.tycs2024@gmail.com',
//         pass: 'kcqk yupy cchn nnsg'
//     }
// });

// async function main() {
//     otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

//     const info = await transporter.sendMail({
//         from: '"OTP code checking 👻" <rescueforce9764@gmail.com>', // sender address
//         to: "tiwarivikrant774@gmail.com", // list of receivers
//         subject: `OTP for freelance account`, // Subject line
//         text: `OTP is: ${otp}`, // plain text body
//         html: `<b>OTP is: ${otp}</b>`, // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);

// // payment qrcode generator
// // import pyqrcode
// // import png
// // from pyqrcode import QRCode
// // upi="saiketdebnath53@oksbi"
// // Sname="SaiketDebnath"
// // money=100
// // link=f"upi://pay?pa={upi}&pn={Sname}&tn=TestingGpay&am={money}&cu=INR"
// // url = pyqrcode.create(link)
// // url.png('myqr.png', scale = 6)

// var QRCode = require('qrcode')
// var canvas = document.getElementById('canvas')

// QRCode.toCanvas(canvas, 'sample text', function (error) {
//   if (error) console.error(error)
//   console.log('success!');
// })