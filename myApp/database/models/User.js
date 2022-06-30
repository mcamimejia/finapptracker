module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        currency: {
            type: dataTypes.STRING(3),
            allowNull: false
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config); 

    User.associate = models => {
        User.hasMany(models.Transaction, {
            as: 'transactions',
            foreignKey: 'user_id'
        });
    }
 
    return User
};