module.exports = {

  mongoURI:"mongodb://footprint:cQZMR[LqbtB8E@13.235.188.102:27017/grocery-live-user-service?authSource=admin",

  expressPort: 3060,
  secureAPI: false,
  siteUrl: "http://13.235.188.102:3060",
  rootPath: "/home/ubuntu/Projects/Grocery/api-gateway",

  // service base urls
  userServiceUrl: "http://13.235.188.102:3061",
  adminServiceUrl: "http://13.235.188.102:3062",

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

  // api key for web service access
  apiAccessKey: "keMStjdies",

  apiAccessKeyForOther: "IYgshr4f(jiv6",

  //allow to check api key
  validateApiAccess:true,


  // when call services internally, use this key instead of token
  internalApiAccessKey: "3x[aR45]YJRJS}45",
};
