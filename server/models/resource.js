module.exports = (sequelize, DataTypes) => {
    const Resource = sequelize.define('Resource', {
      Resource_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      Supplier_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Suppliers',
          key: 'Supplier_ID'
        }
      }
    }, {
      tableName: 'Resources',
      timestamps: true
    });
  
    Resource.associate = (models) => {
      Resource.belongsTo(models.Supplier, {
        foreignKey: 'Supplier_ID',
        as: 'supplier'
      });
      
      Resource.hasMany(models.Distribution, {
        foreignKey: 'Resource_ID',
        as: 'distributions'
      });
    };
  
    return Resource;
  };
