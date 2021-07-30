"use strict";

const mongoose = require("mongoose");

// define schema
const PermissionsSchema = new mongoose.Schema({
    module_name: String,
    module_slug: String,
    permissions: Array,
  },
  {
    timestamps: true
  }
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const Permissions = mongoose.model("permissions", PermissionsSchema);
module.exports = Permissions;
