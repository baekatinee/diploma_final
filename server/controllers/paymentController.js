const { Payment, Rental } = require('../models/models')
const { Client } = require('../models/models')
const apiError = require('../error/apiError')
class paymentController {
    async create(req, res, next) {
        try {
            const { sum, dateStart, clientId, rentalId, hasPaid } = req.body
            const payment = await Payment.create({ sum, dateStart, clientId, rentalId, hasPaid })
            if (!payment) {
                res.status(404).send('Не удалось создать оплату из-за неверно введенных данных')
            }
            return res.json(payment)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
            let { clientId, rentalId, limit, page } = req.query;
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let payments;
            if (!clientId && !rentalId) {
                payments = await Payment.findAndCountAll({
                    limit, offset,
                    include: [
                        {
                            model: Rental,
                            model: Client
                        },

                    ]
                })
            }
            if (clientId && !rentalId) {
                payments = await Payment.findAndCountAll({
                    where: { clientId }, limit, offset,
                    include: [
                        {
                            model: Rental,
                            model: Client
                        },

                    ]
                })
            }
            if (!clientId && rentalId) {
                payments = await Payment.findAndCountAll({
                    where: { rentalId }, limit, offset,
                    include: [
                        {
                            model: Rental,
                            model: Client
                        },

                    ]
                })
            }
            if (clientId && rentalId) {
                payments = await Payment.findAndCountAll({
                    where: { rentalId, clientId }, limit, offset,
                    include: [
                        {
                            model: Rental,
                            model: Client
                        },

                    ]
                })
            }

            return res.json(payments)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }

    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const payment = await Payment.findOne(
                {
                    where: { id }
                }
            )
            if (!payment) {
                res.status(404).send('Такой оплаты не существует в базе')
            }
            return res.json(payment)
        }
        catch (e) {
            next(apiError.badRequest(e.message))
        }
    }
    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { sum, dateStart, clientId, rentalId,  hasPaid } = req.body
            const findPaymentById = await Payment.findOne(
                {
                    where: { id }
                }
            )
            if (!findPaymentById) {
                res.status(404).send('Такой оплаты не существует в базе')
            }
            if (sum) findPaymentById.sum = sum;
            if (dateStart) findPaymentById.dateStart = dateStart;
            if (rentalId) findPaymentById.rentalId = rentalId;
            if ( clientId) findPaymentById. clientId=  clientId;
            if ( hasPaid) findPaymentById.  hasPaid=   hasPaid;
            const updatedPayment = await findPaymentById.save()
            if (!updatedPayment) {
                res.status(400).send('Не удалось сохранить изменения')
            }
            return res.json(updatedPayment);

        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }
    async destroy(req, res, next) {
        try {
            const { id } = req.params
            const payment = await Payment.findOne(
                {
                    where: { id },
  
                }
            )
            if (!payment) {
                res.status(404).send('Такой оплаты не существует в базе')
            }
            await payment.destroy();
            if (!payment) {
                res.status(400).send('Не удалось сохранить изменения')
            }
            res.status(200).send({
                status: "success",
                message: "successfully"
            })
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    
}

module.exports = new paymentController()