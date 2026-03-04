'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mix = sequelize.define('Mix', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
    },
    mixUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Mix.associate = function(models) {
    Mix.belongsTo(models.User, { foreignKey: 'userId' });
    Mix.hasMany(models.StemJob, { foreignKey: 'mixId' });
    Mix.hasMany(models.Stem, { foreignKey: 'mixId' });
  };
  return Mix;
};
