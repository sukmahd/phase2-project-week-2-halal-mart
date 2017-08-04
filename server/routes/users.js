'use strict'

var express = require('express');
var router = express.Router();
var pengguna = require('../controller/pengguna')
var verifyAdmin = require("../helper/authAdmin")

/* GET users listing. */
router.get('/', verifyAdmin.authAdmin ,pengguna.getPengguna);
router.post('/',pengguna.insertPengguna);

module.exports = router;
