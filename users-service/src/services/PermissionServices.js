"use strict";

const { Permissions } = require("../models");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const PermissionServices = {

saveRecord : async function (createPattern) {

  return Permissions.create(createPattern)
    .then(createRes => {
      return createRes;
    }).catch(err => {
      console.log(err);
    });
},

deleteRecord : async function (deletePattern) {

  return Permissions.deleteOne(deletePattern)
    .then(createRes => {
      return createRes;
    }).catch(err => {
      console.log(err);
    });
},

// getAllRecords : async function (findPattern,sortPattern) {
  
//   return Permissions.find(findPattern,sortPattern).then(permissionsData => {
//     return permissionsData;
//   }).catch(err => {
//     console.log(err);
//   });
// }
getAllRecords : async function (findPattern,sortPattern) {
  
  return Permissions.find().then(permissionsData => {
    return permissionsData;
  }).catch(err => {
    console.log(err);
  });
},

}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = PermissionServices;
