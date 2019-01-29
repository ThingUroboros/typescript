import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';

export const userModel = sequelize.define('userModel', {
    name: {
        type: Sequelize.STRING,
    },
    surname: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    birthDate: {
        type: Sequelize.STRING,
     },
});
