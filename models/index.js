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

db.User         = require("./User")(sequelize, Sequelize);
db.Address      = require("./Address")(sequelize, Sequelize);
db.LifePost     = require("./LifePost")(sequelize, Sequelize);
db.LifeCategory = require("./LifeCategory")(sequelize, Sequelize);

db.Address.hasMany(db.User, { foreignKey: 'village1', sourceKey: 'id'});
db.User.belongsTo(db.Address, { foreignKey: 'village1', targetKey: 'id'});
db.Address.hasMany(db.User, { foreignKey: 'village2', sourceKey: 'id'});
db.User.belongsTo(db.Address, { foreignKey: 'village2', targetKey: 'id'});
db.User.hasMany(db.LifePost, { foreignKey: 'user_id', sourceKey: 'id'});
db.LifePost.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id'});
db.Address.hasMany(db.LifePost, { foreignKey: 'address_id', sourceKey: 'id'});
db.LifePost.belongsTo(db.Address, { foreignKey: 'address_id', targetKey: 'id'});
db.LifeCategory.hasMany(db.LifePost, { foreignKey: 'category_id', sourceKey: 'id'});
db.LifePost.belongsTo(db.LifeCategory, { foreignKey: 'category_id', targetKey: 'id'});

module.exports = db;