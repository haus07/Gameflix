import * as Joi from 'joi'

export const validationSchema = Joi.object({
    SECRET_KEY:Joi.string().required()
})