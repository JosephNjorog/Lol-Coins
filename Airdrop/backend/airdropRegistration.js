//this is the airdropRegistration.js java file

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const participants = new Set();
const web3 = new Web3();
const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 60, // per 60 seconds by IP
});

app.post('/register', async (req, res) => {
  try {
    await rateLimiter.consume(req.ip);
    const { address } = req.body;

    if (!web3.utils.isAddress(address)) {
      return res.status(400).send({ success: false, message: 'Invalid address' });
    }

    if (participants.has(address)) {
      return res.status(400).send({ success: false, message: 'Address already registered' });
    }

    participants.add(address);
    res.send({ success: true, message: 'Registered successfully' });
  } catch (err) {
    if (err instanceof RateLimiterMemory) {
      res.status(429).send({ success: false, message: 'Too many requests, please try again later' });
    } else {
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Airdrop registration server running on port ${PORT}`);
});
