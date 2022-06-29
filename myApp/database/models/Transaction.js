module.exports = (sequelize, dataTypes) => {
    let alias = 'Transaction';
    let cols = {
        transaction_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        type: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        amount: {
            type: dataTypes.DECIMAL(13,2),
            allowNull: false
        },
        date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT
        },
        category_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: 'transactions',
        timestamps: false
    }
    const Transaction = sequelize.define(alias, cols, config); 

    Transaction.associate = models => {
        Transaction.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'user_id'
        });

        Transaction.belongsTo(models.Category, {
            as: 'categories',
            foreignKey: 'category_id'
        })
    }
 
    return Transaction
};