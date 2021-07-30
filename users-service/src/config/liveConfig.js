module.exports = {

  mongoURI:"mongodb://footprint:cQZMR[LqbtB8E@13.235.188.102:27017/grocery-live-user-service?authSource=admin",

  expressPort: 3061,
  secureAPI: false,
  siteUrl: "http://13.235.188.102:3061",
  rootPath: "/home/ubuntu/Projects/Grocery/users-service",

  // API gateway base url
  apiGatewayUrl: "http://13.235.188.102:3060",

  // database name
  databaseName: "grocery-live-user-service",

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
    prefix: "grocery_user",
    password: "beLJzkzJWmY58bhnq62TKKDawlx1z97yVeLQOn3ZNFG1qrpwaL8Qe9cZzlWi7PcQp1+0ils9v/ahwofY",
    db: 0,
  },

  // api key for node-geocoder npm package
  geocoderApiKey: "AIzaSyCnHXmtGqz7eOZg2rW9U20KDit1tRF6rhU",

  // api key for web service access
  apiAccessKey: "Ijefdsyce",

  apiAccessKeyForOther: "IYgshr4f(jiv6",

  validateApiAccess:true,

  // when call services internally, use this key instead of token
  internalApiAccessKey: "3x[aR45]YJRJS}45",
  adminid: "5f18295dd364c8608604b992",
  ccAvenu:{
    workingKey:"DBFD4559F790965B098820ACE05333B0",
    accessCode:"AVTL07ID25BH87LTHB"
  }
};
