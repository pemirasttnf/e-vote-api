'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('User', {
            userId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userUuid: {
                allowNull: true,
                type: Sequelize.UUID,
                unique: true,
                defaultValue: Sequelize.UUIDV1
            },
            nama: {
                type: Sequelize.STRING
            },
            nim: {
                type: Sequelize.STRING,
                unique: true
            },
            programStudi: {
                type: Sequelize.BOOLEAN
            },
            tahunAngkatan: {
                type: Sequelize.BOOLEAN
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                defaultValue: ''
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

        return queryInterface.dropTable('User');
    }
};
