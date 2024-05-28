const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/register', (req, res) => {
    const { address } = req.body;

    if (!address) {
        return res.status(400).json({ success: false, message: 'Wallet address is required.' });
    }

    // Validate the Ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        return res.status(400).json({ success: false, message: 'Invalid Ethereum address.' });
    }

    // Add logic here to handle the registration (e.g., saving to a database)
    // For this example, we'll just return a success response
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
