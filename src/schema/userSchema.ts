// tslint:disable-next-line:no-implicit-dependencies
import * as Joi from 'joi'; 

export const userSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    surname: Joi.string().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    birthDate: Joi.number().integer().min(1900).max(2013),
    access_token: [Joi.string(), Joi.number()],
}).with('name' , 'birthDate').without('password', 'access_token');
