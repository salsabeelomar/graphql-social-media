'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        'comments',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          postId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'posts',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          comment: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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
  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('comments', { transaction: t });
    });
  },
};
