module.exports = (sequelize, Sequelize) => {
    class LifeCategory extends Sequelize.Model {}
    LifeCategory.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        imgpath: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'lifecategory'
    });
    return LifeCategory;
};