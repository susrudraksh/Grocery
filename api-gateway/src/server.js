"use strict";

const config =  require('./config');
const express  =  require('express'),
      cors  =  require('cors'),
      fileUpload  =  require('express-fileupload'),
      path  =  require('path');
var request =  require('request');

const {Messages,Response} = require('./helpers');
const {authMiddleware} = require('./middlewares');


require('dotenv').config();

const  app =  express();


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ extended: true, limit: '50mb' }));

//app.use(cors());
app.use(fileUpload());

app.use(express.static('public'));
app.use(express.static('public/build'));

// Allow CORS
app.all('/*', (req, res, next) => {
  console.log(req.url);
  // CORS header support
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization,login_user_id');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Set Security Middlewares
//app.all('/*', [validateRequest.checkWebservicesAccess]);
app.all('/user_service/*', [authMiddleware.checkJWTAuthentication]);
app.all('/content_service/*', [authMiddleware.checkJWTAuthentication]);

// Set Routing for Services
app.get('/', (req, res) => {
  var resMsg = config.siteTitle + " Api gateway is running.";
  Response.send(req, res, 200, "success", resMsg);
});

app.get('/service/assets/', (req, res) => {

  var filepath = req.query.filepath;
  var service = req.query.service;
  var fileurl = "";

  switch (service) {
    case "user_service":
      fileurl = config.userServiceUrl + "/" + filepath;
      break;
    case "content_service":
      fileurl = config.contentServiceUrl + "/" + filepath;
      break;
  }

  request.get(fileurl).pipe(res);
});

app.all('/*', (req, res, next) => {
  // CORS header support
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization, login_user_id');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});


app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true,limit: '50mb'}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

// Service Routes
const userService = require('./routes/serviceRoutes');
const contentService = require('./routes/serviceRoutes');

app.use('/user_service/', userService(config.userServiceUrl));
app.use('/content_service/', contentService(config.contentServiceUrl));

// routing for Web Front end
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'build/index.html'));
});




app.use(function(req,res,next){
  Response.send(req,res,404,Messages.PAGE_NOT_FOUND);
})

var PORT = config.expressPort || 3060; 
app.set('PORT',PORT);

var server = app.listen(PORT,function(){
  console.log("Server start at port "+ PORT);
})

module.exports = server;