//manage env
require('dotenv').config();
console.log(process.env.PORT);

//Define Denpendences
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bson = require('bson');

//Content
const app = express();
const port = process.env.PORT || 3000;

//Import file ./routes
const userRoute = require('./routes/user.route');

//connect to DB
const url = 'mongodb://ds155614.mlab.com:55614/user_api';
mongoose.set('useFindAndModify', false);
mongoose.connect(url, {
	useNewUrlParser: true,
	auth: {
      user: 'admin',
      password: process.env.MONGO_PW
    }
})
    .then( () => {
      console.log('Connected to db');
    }, 
    (err) => {
      console.log('Connect to db failed');
      console.log(err);
    });

//Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Route
app.use('/users', userRoute);

app.listen(port, () => console.log('Server listening on port ' + port));

