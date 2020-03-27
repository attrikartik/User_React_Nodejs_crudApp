const express = require("express");
const bodyParser = require("body-parser");


const sequelize = require('./database/database')

const userRoutes = require("./routes/user");

const app = express(); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // application/json

//middleware for every in-comming requests as frontEnd & backEnd are on differebt ports
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  //middleware for error handling for every requests
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});
 
//all user related request will be handled here
app.use('/admin',userRoutes);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    console.log("connected!!!!!!!!!!!!!!!!!!!")
    app.listen(3005);
  })
  .catch(err => {
    console.log(err);
  });





