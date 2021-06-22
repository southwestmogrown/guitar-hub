'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },  
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    }
  }, {});
  Track.associate = function(models) {
    Track.belongsTo(models.User, { foreignKey: 'userId' });
    Track.hasMany(models.Comment, { foreignKey: 'trackId'});
  };
  return Track;
};