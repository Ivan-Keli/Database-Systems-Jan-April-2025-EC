module.exports = (sequelize, DataTypes) => {
    const Supplier = sequelize.define('Supplier', {
      Supplier_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Contact: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Address: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      tableName: 'Suppliers',
      timestamps: true
    });
  
    Supplier.associate = (models) => {
      Supplier.hasMany(models.Resource, {
        foreignKey: 'Supplier_ID',
        as: 'resources'
      });
    };
  
    return Supplier;
  };
