const Router = require('express')
const router = new Router()
const shipController = require('../controllers/shipController')
const checkRole=require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), shipController.create)//////создание яхиы
router.get('/',checkRole('ADMIN'),  shipController.getAll) /////получение списка яхт
router.get('/:id', checkRole('ADMIN'), shipController.getOne)/////получение одной яхты
router.delete('/:id', checkRole('ADMIN'), shipController.destroy)////удаление яхты
router.put('/:id', checkRole('ADMIN'), shipController.updateOne)
module.exports = router