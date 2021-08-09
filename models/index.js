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

db.User     = require("./User")(sequelize, Sequelize);
db.Address  = require("./Address")(sequelize, Sequelize);

db.Address.hasMany(db.User, { foreignKey: 'village1', sourceKey: 'id'});
db.User.belongsTo(db.Address, { foreignKey: 'village1', targetKey: 'id'});
db.Address.hasMany(db.User, { foreignKey: 'village2', sourceKey: 'id'});
db.User.belongsTo(db.Address, { foreignKey: 'village2', targetKey: 'id'});

module.exports = db;