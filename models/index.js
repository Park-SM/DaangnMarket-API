const properties = require("../config/mysql-properties");
const Sequelize = require("sequelize")
const sequelize = new Sequelize(properties.DB, properties.ID, properties.PW, {
    dialect: 'mysql',
    host: properties.HOST,
    port: properties.PORT,
    logging: properties.LOGGING
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Address = require("./Address")(sequelize, Sequelize);

// Model ForeignKey 지정

module.exports = db;