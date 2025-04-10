module.exports = (sequelize, DataTypes) => {
    const School = sequelize.define('School', {
      School_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Contact_Person: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'Schools',
      timestamps: true
    });
  
    School.associate = (models) => {
      School.hasMany(models.Distribution, {
        foreignKey: 'School_ID',
        as: 'distributions'
      });
    };
  
    return School;
  };
