'use strict'

var express = require('express');
var router = express.Router();
var pengguna = require('../controller/pengguna')
var verifyAdmin = require("../helper/authAdmin")
var authen = require('../controller/autentikasi')

/* GET users listing. */
router.get('/', verifyAdmin.authAdmin ,pengguna.getPengguna);
router.post('/', pengguna.insertPengguna);
router.get('/signin', authen.signin);

module.exports = router;
