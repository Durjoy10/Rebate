const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB Atlas connection string
const uri = "mongodb+srv://durjoydey10:durjoy10@rebate.ndrhjgi.mongodb.net/?retryWrites=true&w=majority&appName=rebate";

// Connect to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Error connecting to MongoDB Atlas:", err));

// Define user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.password === password) {
                // Successful login
                res.json({ success: true, message: 'Login successful' });
            } else {
                // Invalid password
                res.json({ success: false, message: 'Invalid email or password' });
            }
        } else {
            // User does not exist
            res.json({ success: false, message: 'User does not exist' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Signup route
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Email already exists
            res.json({ success: false, message: 'Email already exists' });
        } else {
            // Create new user
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








  