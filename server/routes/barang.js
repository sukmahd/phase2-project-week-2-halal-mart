'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controller/controllerBarang')

router.get('/', controller.getAllBarang)
router.get('/:id', controller.getOneBarang)
router.post('/', controller.addBarang)
router.delete('/:id', controller.deleteBarang)
router.put('/:id', controller.editBarang)

module.exports = router;
