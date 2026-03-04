'use strict';
module.exports = (sequelize, DataTypes) => {
  const StemJob = sequelize.define('StemJob', {
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'complete', 'failed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    error: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {});
  StemJob.associate = function(models) {
    StemJob.belongsTo(models.Song, { foreignKey: 'songId' });
    StemJob.hasMany(models.Stem, { foreignKey: 'stemJobId' });
  };
  return StemJob;
};
