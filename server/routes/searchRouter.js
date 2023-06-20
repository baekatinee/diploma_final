const Router=require('express')
const router=new Router()
const searchController=require('../controllers/searchController')
const checkRole=require('../middleware/checkRoleMiddleware')

router.get('/', checkRole('ADMIN'), searchController.searchAll)

module.exports=router