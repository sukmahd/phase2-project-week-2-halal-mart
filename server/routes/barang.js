'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controller/controllerBarang')
const middleware = require('../helper/authAdmin')

router.get('/', middleware.authAdmin, controller.getAllBarang)
router.get('/:id', controller.getOneBarang)
router.get('/by/:kategori', controller.getByCategory)
router.post('/', controller.addBarang)
router.delete('/:id', controller.deleteBarang)
router.put('/:id', controller.editBarang)
router.put('/stok/:id', controller.editStok)


module.exports = router;
