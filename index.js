// EXPRESS - SERVER SETUP, COMMUNICATION BETWEEN SERVER AND BROWSER
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));

require('dotenv').config();

// DATABASE, COMMUNICATION BETWEEN SERVER AND DATABASE
const mongoose = require('mongoose');
// const MONGODB_KEY = "mongodb+srv://sakshi:Apple@123@cluster0-4vop9.mongodb.net/share?retryWrites=true&w=majority";
const MONGODB_KEY = process.env.MONGODB_KEY;
mongoose.connect(MONGODB_KEY, {useNewUrlParser: true});

// DATA MODEL, THE KIND OF DATA EX - TEXT
const shareSchema = new mongoose.Schema({entry: String});
const Share = mongoose.model('Share', shareSchema);

//HANDLE USER SUBMISSION
app.post("/share-submit", (req, res) => {
    const shareText = req.body.shareText;
    // console.log(shareText);
    const newShare = new Share({ entry: shareText });
    newShare.save().then(savedShare =>{
        res.json(savedShare.toJSON());
    })
});

// GET ALL USER SUBMISSION
app.get("/all-submissions", (req, res) => {
    Share.find({}).then((submissions) => {
    res.json(submissions);
    })
});

// CONNECTION
// const PORT = 3000;
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("server running on port " + PORT));