'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    const Vote = sequelize.define('Vote', {
        voteId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        voteUuid: {
            allowNull: true,
            type: DataTypes.UUID,
            unique: true,
            defaultValue: Sequelize.UUIDV1
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'userId'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        vote: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Candidate',
                key: 'candidateId'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
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
                Vote.belongsTo(models.User, {
                    as: 'user',
                    foreignKey: 'userId'
                });

                Vote.belongsTo(models.Candidate, {
                    as: 'candidate',
                    foreignKey: 'candidateId'
                });

            }
        }
    });

    return Vote;
};
