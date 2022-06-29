module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        category_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        color: {
            type: dataTypes.STRING(50)
        }
    };
    let config = {
        tableName: 'categories',
        timestamps: false
    }
    const Category = sequelize.define(alias, cols, config); 

    Category.associate = models => {
        Category.hasMany(models.Transaction, {
            as: 'transactions',
            foreignKey: 'category_id'
        });
    }
 
    return Category
};