module.exports = {

  mongoURI:"mongodb://footprint:cQZMR[LqbtB8E@3.7.46.171:27017/grocery-live-content-service?authSource=admin",

  expressPort: 3062,
  siteUrl: "http://3.7.46.171:3062",
  rootPath: "/home/ubuntu/Projects/Grocery/content-service",

  // database name
  databaseName: "grocery-live-content-service",

  // project name
  siteTitle: "GroceryApp",

  // API gateway base url
  apiGatewayUrl: "http://3.7.46.171:3060",

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
};

