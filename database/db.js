const { Sequelize } = require('sequelize');

const createDb = new Sequelize('day5', 'user', 'pass', {
    dialect: 'sqlite',
    host: '/database/db.sqlite'
});

const connectDb = () => {
    createDb.sync().then(() => {
        console.log('Db is connected');
    }).catch((e) => {
        console.log('Db is failed connect', e);
    })
}

module.exports = { createDb, connectDb }