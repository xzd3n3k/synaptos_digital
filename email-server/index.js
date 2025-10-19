const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const api_password = require('../src/.env/.env.js')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {

    console.log(req.body.address);
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.note;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'synaptos.digi@gmail.com', // Your Gmail address
            //pass: 'hesloDoAppky'     // The App Password generated above
        }
    });

    const mailOptions = {
        from: email,
        to: 'synaptos.digi@gmail.com',
        subject: 'Poptávka z webu',
        text: `
    Jméno a příjmení: ${req.body.firstname} ${req.body.lastname}
    Email: ${email}
    Poznámka: ${message}
    Ulice: ${req.body.address.street} ${req.body.address.houseNumber}
    Město: ${req.body.address.city}
    PSČ: ${req.body.address.postalCode}
    Stát: ${req.body.address.country}
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(false);
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send(true);
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
