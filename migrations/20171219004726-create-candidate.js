'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('Candidate', {
            candidateId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            candidateUuid: {
                allowNull: true,
                type: Sequelize.UUID,
                unique: true,
                defaultValue: Sequelize.UUIDV1
            },
            candidateNumber: {
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            nim: {
                type: Sequelize.STRING,
                unique: true
            },
            position: {
                type: Sequelize.STRING
            },
            studyProgram: {
                type: Sequelize.STRING
            },
            generationYears: {
                type: Sequelize.STRING
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

        return queryInterface.dropTable('Candidate');
    }
};
