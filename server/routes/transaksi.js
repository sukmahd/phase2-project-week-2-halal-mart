'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controller/controllerTransaction')

router.get('/', controller.getAllTransaksi)
router.post('/', controller.createTransaksi)
router.get('/:id', controller.getOneTransaksi)
router.put('/:id', controller.pushBarangToTransaksi)

module.exports = router;
