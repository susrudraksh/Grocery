const express  =  require('express'),
      cors  =  require('cors'),
      fileUpload  =  require('express-fileupload'),
      path  =  require('path');

var {Messages,Response} = require('./helpers');
var {authMiddleware} = require('./middlewares');
var config =  require('./config');

require('dotenv').config();

const  app =  express();

app.use(cors());
app.use(fileUpload());

const {AdminRoutes,CustomerRoutes,DriverRoutes} =  require('./routes');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true,limit: '50mb'}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static('public'));

app.all('/*', (req, res, next) => {
  //console.log(req);
  // CORS header support
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

//app.all('/*',authMiddleware.validaterequest);
app.use('/admin',AdminRoutes);
app.use('/customer',CustomerRoutes);
app.use('/driver',DriverRoutes);
app.use('/validate_authorization/', authMiddleware.validateAuthorization);
app.use(express.static('public'))
app.use(function(req,res,next){

  Response.send(req,res,404,"error",Messages.PAGE_NOT_FOUND);
})

var PORT = config.expressPort || 3061; 
app.set('PORT',PORT);

var server = app.listen(PORT,function(){
  console.log("Server start at port "+ PORT);
})

module.exports = server;