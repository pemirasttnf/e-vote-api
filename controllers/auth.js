'use strict';

const Models        = require('../models');
const Bcrypt        = require('bcrypt');
const Boom          = require('boom');
const JwToken       = require('../plugins/jwToken');
const Sequelize     = require('sequelize');
const Axios         = require('axios');
const Querystring   = require('querystring');
const EventEmitter  = require('events');
const notifier      = new EventEmitter().setMaxListeners(0);

module.exports = {

    notifier,

    register: (request, reply) => {

        Axios.post('https://info.nurulfikri.ac.id/sisfo/api/user/', Querystring.stringify({
            token: request.payload.token,
            nim: request.payload.nim,
            password: request.payload.password
        })
        ).then((response) => {

            const results = response.data;
            const uniqueCode = generateUniqueCode();

            const userObject = {
                'nim': results.data.nim,
                'name': results.data.nama,
                'email': request.payload.email,
                'password': request.payload.password + uniqueCode,
                'programStudi': results.data.prodi,
                'tahunAngkatan': results.data.tahun_angkatan,
                'status': results.data.status_mhsw,
                'avatar': results.data.url_foto
            };

            Models.User.findOne({
                where: {
                    nim: request.payload.nim
                }
            }).then((checkUser, error) => {

                if (!checkUser) {

                    Models.User.create(userObject).then((user) => {

                        userObject.userId = user.userId;

                        notifier.emit('RegisterUniqueCode', {
                            name: user.name,
                            uniqueCode
                        });

                        reply({
                            statusCode: 200,
                            data: user,
                            uniqueCode
                        }).code(200);

                        Models.User.findAndCountAll().then((total) => {

                            notifier.emit('RegisterVoterTotal', total);

                        });

                    }).catch(Sequelize.ValidationError, (err) => {

                        // respond with validation errors
                        return reply({
                            statusCode: 400,
                            error: 'Bad Request',
                            message: err.errors[0].message
                        }).code(400);

                    });
                }
                else {
                    return reply(Boom.forbidden('Sorry, Kamu telah login!'));
                }

            });
        }).catch((error) => {

            // console.log(error);
            return reply(Boom.unauthorized('Invalid nim or password'));

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
                return reply(Boom.notFound('Sorry, Account not found!'));
            }

            Models.Vote.findOne({
                where: {
                    nim: user.nim
                }
            }).then((vote, err) => {

                if (vote) {
                    return reply(Boom.forbidden('Terima kasih, anda sebelumnya telah memberikan suara!'));
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
                        return reply(Boom.unauthorized('Invalid nim or password'));
                    }
                });

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

            const results = response.data;

            const userObject = {
                'nim': results.data.nim,
                'name': results.data.nama,
                'programStudi': results.data.prodi,
                'tahunAngkatan': results.data.tahun_angkatan,
                'status': results.data.status_mhsw,
                'avatar': results.data.url_foto
            };

            Models.User.findOne({
                where: {
                    nim: request.payload.nim
                }
            }).then((checkUser, error) => {

                if (!checkUser) {

                    Models.User.create(userObject).then((user) => {

                        userObject.userId = user.userId;

                        reply({
                            statusCode: 200,
                            data: user,
                            secretToken: JwToken.issue({
                                user
                            })
                        }).code(200);

                    }).catch(Sequelize.ValidationError, (err) => {

                        // respond with validation errors
                        return reply({
                            statusCode: 400,
                            error: 'Bad Request',
                            message: err.errors[0].message
                        }).code(400);

                    });
                }
                else {
                    return reply(Boom.forbidden('Sorry, Kamu telah login!'));
                }

            });
        }).catch((error) => {

            // console.log(error);
            return reply(Boom.unauthorized('Invalid nim or password'));

        });

    }

};

// See: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
const generateUniqueCode = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 3; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};
