const properties = require("../config/mysql-properties");
const Sequelize = require("sequelize")
const sequelize = new Sequelize(properties.DB, properties.ID, properties.PW, {
    dialect: 'mysql',
    host: properties.HOST,
    port: properties.PORT
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Model 생성

// Model ForeignKey 지정

module.exports = db;