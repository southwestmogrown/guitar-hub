'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StemJobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      songId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Songs' }
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('pending', 'processing', 'complete', 'failed'),
        defaultValue: 'pending'
      },
      error: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StemJobs');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_StemJobs_status";');
  }
};
