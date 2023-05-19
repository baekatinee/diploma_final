const Router=require('express')
const router=new Router()

const clientRouter=require('./clientRouter')
const userRouter=require('./userRouter')
const shipRouter=require('./shipRouter')
const typeRouter=require('./typeRouter')
const paymentRouter=require('./paymentRouter')
const rentalRouter=require('./rentalRouter')

router.use('/user', userRouter)
router.use('/client', clientRouter)
router.use('/type', typeRouter)
router.use('/ship', shipRouter)
router.use('/payment', paymentRouter)
router.use('/rental', rentalRouter)

module.exports=router