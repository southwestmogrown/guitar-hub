'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stem = sequelize.define('Stem', {
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stemJobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stemType: {
      type: DataTypes.ENUM('vocals', 'drums', 'bass', 'other'),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {});
  Stem.associate = function(models) {
    Stem.belongsTo(models.Song, { foreignKey: 'songId' });
    Stem.belongsTo(models.StemJob, { foreignKey: 'stemJobId' });
  };
  return Stem;
};
