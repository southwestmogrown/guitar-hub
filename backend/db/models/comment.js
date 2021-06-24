'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId:{ 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trackId: {
      type: DataTypes.INTEGER
    },
    songId: {
      type: DataTypes.INTEGER
    },
    body: {
      type: DataTypes.STRING
    }
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Track, { foreignKey: 'trackId' });
    Comment.belongsTo(models.Song, { foreignKey: 'songId' });
  };
  return Comment;
};