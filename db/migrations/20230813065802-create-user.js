'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        'users',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          username: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          birthday: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          phoneNumber: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          deletedAt: {
            type: Sequelize.DATE,
          },
          deletedBy: {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          createdBy: {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          updatedBy: {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            type: Sequelize.DATE,
          },
        },
        { transaction: t },
      );
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('users', {
        transaction: t,
      });
    });
  },
};
