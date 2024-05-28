const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.post('/register', (req, res) => {
    const { wallet, email } = req.body;

    // Validation
    if (!wallet || !email) {
        return res.status(400).json({ message: 'Ethereum wallet address and email are required' });
    }

    // Save to database (example with Mongoose)
    const Wallet = require('./models/Wallet');
    const newWallet = new Wallet({ wallet, email });
    newWallet.save()
        .then(() => {
            // Send confirmation email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: email,
                subject: 'LoLFun Coin Airdrop Registration Confirmation',
                text: 'Thank you for registering for the LoLFun Coin Airdrop!'
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ message: 'Error sending confirmation email' });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json({ message: 'Registration successful! Confirmation email sent.' });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error saving data' });
        });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
