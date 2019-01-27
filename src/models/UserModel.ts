import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';

export const userModel = sequelize.define('userModel', {
    jmeno: {
        type: Sequelize.STRING,
    },
    prijmeni: {
        type: Sequelize.STRING,
    },
    heslo: {
        type: Sequelize.STRING,
    },
    datum_narozeni: {
        type: Sequelize.STRING,
     },
});
