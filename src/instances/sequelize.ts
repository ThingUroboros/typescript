import * as Sequelize from 'sequelize';

const db = 'martin';
const username = 'martin';
const password = '12345';
export const sequelize = new Sequelize(db, username, password, {
    dialect: 'postgres',
  });
