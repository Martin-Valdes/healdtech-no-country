require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
    // URL
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,

    { logging: false, native: false }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully at DB.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = {
    conn: sequelize,
};
