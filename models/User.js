module.exports = (sequelize, Sequelize) => {
    class User extends Sequelize.Model {}
    User.init({
        name: {
            type: Sequelize.STRING(12),
            allowNull: true
        },
        email: {
            type: Sequelize.STRING(120),
            allowNull: false
        },
        village1: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        village2: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        temperature: {
            type: Sequelize.DECIMAL(3, 1),
            allowNull: false,
            defaultValue: 36.5
        },
        isAuthenticated: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        authenticatedDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        retradeRate: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        answerRate: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        refreshToken: {
            type: Sequelize.STRING,
            allowNull: true
        }// },
        // createdAt: {
        //     type: 'TIMESTAMP',
        //     defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        //     allowNull: false
        //   },
        //   updatedAt: {
        //     type: 'TIMESTAMP',
        //     defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        //     allowNull: false
        //   }
    }, {
        sequelize,
        tableName: 'user'
    });
    return User;
};