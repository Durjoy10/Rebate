const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // Ensure dotenv is used to load environment variables in local development

const app = express();
app.use(bodyParser.json());

// Use the environment variable for the MongoDB connection string
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Error connecting to MongoDB Atlas:", err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/Rebate/public/login.html');
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.password === password) {
                res.json({ success: true, message: 'Login successful' });
            } else {
                res.json({ success: false, message: 'Invalid email or password' });
            }
        } else {
            res.json({ success: false, message: 'User does not exist' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.json({ success: false, message: 'Email already exists' });
        } else {
            const newUser = new User({ name, email, password });
            await newUser.save();
            res.json({ success: true, message: 'Sign up successful' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});








  