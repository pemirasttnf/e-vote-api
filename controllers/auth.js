'use strict';

const Models    = require('../models');
const Bcrypt    = require('bcrypt');
const Boom      = require('boom');
const JwToken   = require('../plugins/jwToken');
const Sequelize = require('sequelize');
const Axios     = require('axios');
const Querystring = require('querystring');

module.exports = {

    register: (request, reply) => {

        const attributes = request.payload;

        Models.User.create(attributes).then((userCreated) => {

            return reply({
                statusCode: 200,
                data: userCreated
            }).code(200);

        }).catch(Sequelize.ValidationError, (err) => {

            // respond with validation errors
            return reply({
                statusCode: 400,
                error: 'Bad Request',
                message: err.errors[0].message
            }).code(400);

        })
            .catch((err) => {

                console.log(err);
                return reply(err);

            });

    },

    login: (request, reply) => {

        const nim = request.payload.nim;
        const password = request.payload.password;

        Models.User.findOne({
            where: {
                nim
            }
        }).then((user, err) => {

            if (!user) {
                return reply(Boom.notFound('Maaf, akun tidak terdaftar!'));
            }

            // Load hash from your password DB.
            Bcrypt.compare(password, user.password, (err, valid) => {

                if (err) {
                    return reply(err);
                }

                if (!err && valid) {

                    reply({
                        statusCode: 200,
                        data: user,
                        secretToken: JwToken.issue({
                            user
                        })
                    }).code(200);

                }
                else {
                    return reply(Boom.unauthorized('Invalid email or password'));
                }
            });
        }).catch((err) => {

            return reply(err);

        });
    },

    loginSisfo: (request, reply) => {

        Axios.post('https://info.nurulfikri.ac.id/sisfo/api/user/', Querystring.stringify({
            token: request.payload.token,
            nim: request.payload.nim,
            password: request.payload.password
        })
        ).then((response) => {

            console.log(response.data);

            // reply({
            //     statusCode: 200,
            //     data: response.data
            // }).code(200);

            reply(response.data).code(200);

        }).catch((error) => {

            console.log(error);
            reply(error);

        });

    }

};
