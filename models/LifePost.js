module.exports = (sequelize, Sequelize) => {
    class LifePost extends Sequelize.Model {}
    LifePost.init({
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        address_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT('medium'),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'lifepost'
    });
    return LifePost;
};