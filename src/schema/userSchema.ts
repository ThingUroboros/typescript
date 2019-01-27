// tslint:disable-next-line:no-implicit-dependencies
import * as Joi from 'joi'; 

export const userSchema = Joi.object().keys({
    jmeno: Joi.string().min(3).max(30).required(),
    prijmeni: Joi.string().min(3).max(30).required(),
    heslo: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    datum_narozeni: Joi.number().integer().min(1900).max(2013),
    access_token: [Joi.string(), Joi.number()],
}).with('jmeno' , 'datum_narozeni').without('heslo', 'access_token');
