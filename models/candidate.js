'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    const Candidate = sequelize.define('Candidate', {
        candidateId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        candidateUuid: {
            allowNull: true,
            type: DataTypes.UUID,
            unique: true,
            defaultValue: Sequelize.UUIDV1
        },
        candidateNumber: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        nim: {
            type: DataTypes.STRING,
            unique: true
        },
        position: {
            type: DataTypes.STRING
        },
        studyProgram: {
            type: DataTypes.STRING
        },
        generationYears: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }, {
        // don't forget to enable timestamps!
        timestamps: true,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                Candidate.hasOne(models.Vote, {
                    foreignKey: 'vote'
                });

            }
        }
    });

    return Candidate;
};
