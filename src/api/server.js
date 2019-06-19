const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const loginRoute = require('./login.router');
const contactRoute = require('./contact.router');
const chartRoute = require('./chart.router');
const uploadRoute = require('./upload.router');
const path = require('path');

// create express app
const app = express();
const cors = require('cors');

app.use(cors());
app.use('/uploads', express.static('uploads'));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'uploads')))

// Configuring the database
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

app.use(express.static('./public'));
app.use('/login', loginRoute);
app.use('/contact', contactRoute);
app.use('/chart', chartRoute);
app.use('/upload',uploadRoute)

// listen for requests
app.listen(process.env.PORT || 4000, () => {
    console.log("Server is listening on port 4000");
});
