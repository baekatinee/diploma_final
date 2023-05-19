const Router=require('express')
const router=new Router()
const paymentController=require('../controllers/paymentController')
const checkRole=require('../middleware/checkRoleMiddleware')

router.get('/', checkRole('ADMIN'), paymentController.getAll)
router.post('/',  checkRole('ADMIN'), paymentController.create)
router.get('/:id', checkRole('ADMIN'), paymentController.getOne)
router.delete('/:id', checkRole('ADMIN'), paymentController.destroy)
router.put('/:id',  checkRole('ADMIN'), paymentController.updateOne)
module.exports=router