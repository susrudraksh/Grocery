var path = require('path');
var rootPath = path.join(__dirname,"../..");
module.exports = {

  mongoURI: "mongodb://localhost:27017/grocery-live-user-service",
//mongoURI: "mongodb://footprint:cQZMR[LqbtB8E@3.7.46.171:27017/admin",

  //mongoURI: "mongodb://footprint:cQZMR[LqbtB8E@3.7.46.171:27017/grocery-live-user-service?authSource=admin",

  expressPort: 3051,
  siteUrl: "http://localhost:3051",
  rootPath: rootPath,

  // API gateway base url
  apiGatewayUrl: "http://localhost:3050",

  // database name
  databaseName: "grocery-user-service",

  // project name
  siteTitle: "GroceryApp",

  // JWT Secret Key
  jwtSecretKey: "GroceryAppusers",

  // Login session expiration setting for App Users
  appLoginSessionExpiryTime: 24 * 60, // in minutes
  appLoginSessionAuthCheck: true,

  timeZone: "Asia/Kolkata",


  // Redis Config Options. Ref: https://www.npmjs.com/package/ioredis
  redisConfigOpts: {
    port: 6379,
    host: "127.0.0.1",
    prefix: "local_grocery_user",
    password: "beLJzkzJWmY58bhnq62TKKDawlx1z97yVeLQOn3ZNFG1qrpwaL8Qe9cZzlWi7PcQp1+0ils9v/ahwofY",
    db: 4,
  },

  fcmServerKey:
  "AAAAkxV8TIA:APA91bExA1_-uQan5cNpzx1Bs1YQVa2oK-321M108wyp42MAj7p5G2IzP-y0N2qx9nYilAwyg42r_D7wclwHL0E-RrRQjAb2GkvsanDGzzKDtbtqQZcDFR3TripMrjY3EatvSekaMDsJ",

  // email sending configuration
  email_auth_user: "johnwick.octal@gmail.com",
  email_auth_password: "dtxgdyyubbzqejve",
  email_auth_service: "gmail",
  email_auth_port: 587,
  email_auth_host: "smtp.gmail.com",
  email_from: "johnwick.octal@gmail.com",
  email_from_name: "Grocery eWallet",

  // api key for node-geocoder npm package
  geocoderApiKey: "AIzaSyCnHXmtGqz7eOZg2rW9U20KDit1tRF6rhU",

  // api key for web service access
  apiAccessKey: "Ijefdsyce",

  apiAccessKeyForOther: "IYgshr4f(jiv6",

  validateApiAccess: true,

  twilioAccountSid: "ACe55c2eff3879c9f645428b14098ad9d2",

  twilioAuthToken: "de06684460e759c72436ee0a3e97fe72",

  twilioFromPhone: "+18646148913", // +15005550006
  // when call services internally, use this key instead of token
  internalApiAccessKey: "3x[aR45]YJRJS}45",

  adminid: "5f18295dd364c8608604b992",

  ccAvenu:{
    workingKey:"DBFD4559F790965B098820ACE05333B0",
    accessCode:"AVTL07ID25BH87LTHB"
  }
};
