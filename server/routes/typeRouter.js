const Router=require('express')
const router=new Router()
const typeController=require('../controllers/typeController')
const checkRole=require('../middleware/checkRoleMiddleware')

router.get('/', checkRole('ADMIN'), typeController.getAll)
router.post('/', checkRole('ADMIN'), typeController.create)
router.get('/:id', checkRole('ADMIN'), typeController.getOne)
router.delete('/:id', checkRole('ADMIN'), typeController.destroy)
router.put('/:id', checkRole('ADMIN'), typeController.updateOne)

module.exports=router