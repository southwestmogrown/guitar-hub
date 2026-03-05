'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`ALTER TYPE "enum_Stems_stemType" ADD VALUE IF NOT EXISTS 'guitar';`);
    await queryInterface.sequelize.query(`ALTER TYPE "enum_Stems_stemType" ADD VALUE IF NOT EXISTS 'piano';`);
  },

  down: async (queryInterface, Sequelize) => {
    // Postgres does not support removing enum values without recreating the type.
    // No-op for rollback — guitar and piano values will remain but be unused.
  }
};
