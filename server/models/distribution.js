module.exports = (sequelize, DataTypes) => {
    const Distribution = sequelize.define('Distribution', {
      Distribution_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      School_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Schools',
          key: 'School_ID'
        }
      },
      Resource_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Resources',
          key: 'Resource_ID'
        }
      },
      Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      Date_Distributed: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      Status: {
        type: DataTypes.ENUM('pending', 'in_transit', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
      }
    }, {
      tableName: 'Distributions',
      timestamps: true
    });
  
    Distribution.associate = (models) => {
      Distribution.belongsTo(models.School, {
        foreignKey: 'School_ID',
        as: 'school'
      });
      
      Distribution.belongsTo(models.Resource, {
        foreignKey: 'Resource_ID',
        as: 'resource'
      });
    };
  
    return Distribution;
  };
