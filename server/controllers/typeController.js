const { Type } = require('../models/models')
const apiError = require('../error/apiError')

class typeController {
    async create(req, res, next) {
        try {
            const { name } = req.body
            const type = await Type.create({ name })
            if (!type) {
                res.status(404).send('Не удалось создать тип из-за неверно введенных данных')
            }
            return res.json(type)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
            let { limit, page, name } = req.query;
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let types;
            if (!name) {
                types = await Type.findAndCountAll({
                   limit, offset
                })
            }
            if (name) {
                types = await Type.findAndCountAll({
                    where: { name }, limit, offset,
                })
            }
            return res.json(types)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const type = await Type.findOne(
                {
                    where: { id }
                }
            )
            if (!type) {
                res.status(404).send('Такого типа не существует в базе')
            }
            return res.json(type)
        }
        catch (e) {
            next(apiError.badRequest(e.message))
        }
    }
    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body
            const findTypeById = await Type.findOne(
                {
                    where: { id }
                }
            )
            if (!findTypeById) {
                res.status(404).send('Такой оплаты не существует в базе')
            }
            if (name) findTypeById.name = name;


            const updatedType = await findTypeById.save()
            if (!updatedType) {
                res.status(400).send('Не удалось сохранить изменения')
            }
            return res.json(updatedType);

        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }
    async destroy(req, res, next) {
        try {
            const { id } = req.params
            const type = await Type.findOne(
                {
                    where: { id }
                }
            )
            if (!type) {
                res.status(404).send('Такого типа не существует в базе')
            }
            type.destroy();
            if (!type) {
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

module.exports = new typeController()