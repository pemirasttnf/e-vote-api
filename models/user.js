'use strict';

const Bcrypt = require('bcrypt'); // We don't want to store password with out encryption
const saltRounds = 10; // see: (https://github.com/kelektiv/node.bcrypt.js#a-note-on-rounds)

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        userId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userUuid: {
            allowNull: true,
            type: DataTypes.UUID,
            unique: true
        },
        nama: {
            type: DataTypes.STRING
        },
        nim: {
            type: DataTypes.STRING,
            unique: true
        },
        programStudi: {
            type: DataTypes.STRING
        },
        tahunAngkatan: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
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

            }
        },
        hooks: {
            // Sequelize: Hooks (https://youtu.be/JAld7bV5qV8)
            beforeCreate: function (user, options, next) {
                // Info: (https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt)
                Bcrypt.genSalt(saltRounds, (err, salt) => {

                    if (err) {
                        return next(err);
                    }
                    Bcrypt.hash(user.password, salt, (err, hash) => {

                        if (err) {
                            return next(err);
                        }
                        user.password = hash;
                        next();
                    });
                });
            }
        },
        instanceMethods: {
            // We don't wan't to send back encrypted password either
            // See: (https://stackoverflow.com/questions/27972271/sequelize-dont-return-password)
            toJSON: function () {

                const values = Object.assign({}, this.get());

                delete values.password;
                return values;
            }
        }
    });

    return User;
};

