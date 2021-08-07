module.exports = (sequelize, Sequelize) => {
    class Address extends Sequelize.Model {}
    Address.init({
        address: {
            type: Sequelize.STRING(120),
            allowNull: false
        },
        latitude: {
            type: Sequelize.DECIMAL(15, 6),
            allowNull: false
        },
        longitude: {
            type: Sequelize.DECIMAL(15, 6),
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'address',
        timestamps: false
    });
    return Address;
};