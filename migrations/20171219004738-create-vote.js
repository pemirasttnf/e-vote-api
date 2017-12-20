'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('Vote', {
            voteId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            voteUuid: {
                allowNull: true,
                type: Sequelize.UUID,
                unique: true,
                defaultValue: Sequelize.UUIDV1
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'User',
                    key: 'userId'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            nim: {
                type: Sequelize.STRING
            },
            vote: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Candidate',
                    key: 'candidateId'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {

        return queryInterface.dropTable('Vote');
    }
};
