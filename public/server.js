const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

let doctorStatus = "Unavailable";

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD
    }
});

// Update doctor status
app.post('/update-status', (req, res) => {
    doctorStatus = req.body.status;
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.PATIENTS_EMAILS,
        subject: `Doctor Status Update`,
        text: `The doctor is now ${doctorStatus}. You can visit the clinic now.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log("Email sent: " + info.response);
    });

    res.sendStatus(200);
});

// Send custom notifications
app.post('/send-notification', (req, res) => {
    const message = req.body.message;
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.PATIENTS_EMAILS,
        subject: "Doctor's Message",
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log("Email sent: " + info.response);
    });

    res.sendStatus(200);
});

app.listen(3000, () => console.log('Server running on port 3000'));
