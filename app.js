const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const Card = require('./models/card.js');
const Users = require('./models/user.js');


const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});



app.use(bodyParser.json());
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/rebate-register', { useNewUrlParser: true, useUnifiedTopology: true });

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
    const {  email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.json({ success: false, message: 'Login Successful.' });
        } else {
            const newUser = new User({  email, password });
            await newUser.save();
            res.json({ success: true, message: 'Login successful' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            // Redirect to user's profile page on successful login
            res.redirect(`/index/${user._id}`);
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/createAccount', (req, res) => {
    res.sendFile(__dirname + '/createAccount.html');
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

app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.json({ success: false, message: 'Email already exists' });
        } else {
            const newUser = new User({ name, email, password });
            const savedUser = await newUser.save();
            // Redirect to user's profile page on successful signup
            res.redirect(`/profile/${savedUser._id}`);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});






app.listen(PORT, function () {
  console.log("server is running.");
});



  