const Router = require('express')
const router = new Router()
const rentalController = require('../controllers/rentalController')
const checkRole=require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), rentalController.create)//////создание яхиы
router.get('/', checkRole('ADMIN'), rentalController.getAll) /////получение списка яхт
router.get('/:id', checkRole('ADMIN'), rentalController.getOne)/////получение одной яхты
router.delete('/:id', checkRole('ADMIN'), rentalController.destroy)////удаление яхты
router.put('/:id', checkRole('ADMIN'), rentalController.updateOne)//////обновление яхты

module.exports = router