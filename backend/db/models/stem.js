'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stem = sequelize.define('Stem', {
    mixId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stemJobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stemType: {
      type: DataTypes.ENUM('vocals', 'drums', 'bass', 'guitar', 'piano', 'other'),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {});
  Stem.associate = function(models) {
    Stem.belongsTo(models.Mix, { foreignKey: 'mixId' });
    Stem.belongsTo(models.StemJob, { foreignKey: 'stemJobId' });
  };
  return Stem;
};
