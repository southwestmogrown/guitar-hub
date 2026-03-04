'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stems', {
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
      stemJobId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'StemJobs' }
      },
      stemType: {
        allowNull: false,
        type: Sequelize.ENUM('vocals', 'drums', 'bass', 'other')
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING(255)
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
    await queryInterface.dropTable('Stems');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Stems_stemType";');
  }
};
