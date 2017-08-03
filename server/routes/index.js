var express = require('express');
var router = express.Router();
const autentikasi = require('../controller/autentikasi')
const pengguna  = require("../models/pengguna")
var jwt = require('jsonwebtoken');
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/signin',autentikasi.signin)

module.exports = router;
