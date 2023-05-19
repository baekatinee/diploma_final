const Router=require('express')
const router=new Router()
const clientController=require('../controllers/clientController')
const checkRole=require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'),  clientController.create)
router.get('/', checkRole('ADMIN'),  clientController.getAll)
router.get('/:id', checkRole('ADMIN'),  clientController.getOne)
router.delete('/:id',  checkRole('ADMIN'), clientController.destroy)
router.put('/:id', checkRole('ADMIN'),  clientController.updateOne)
module.exports=router