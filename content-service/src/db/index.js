'use strict';

const mongooes = require('mongoose');
const config = require('../config');

mongooes.connect(config.mongoURI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});