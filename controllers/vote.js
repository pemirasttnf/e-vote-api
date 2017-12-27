'use strict';

const Models        = require('../models');
const Boom          = require('boom');
const EventEmitter  = require('events');
const notifier      = new EventEmitter().setMaxListeners(0);

module.exports = {

    notifier,

    listVote: (request, reply) => {

        Models.Vote.findAndCountAll().then((vote) => {

            if (!vote) {
                return reply(Boom.notFound('Vote does not exist.'));
            }

            return reply({
                statusCode: 200,
                total: vote.count,
                data: vote.rows
            }).code(200);

        }).catch((err) => {

            return reply(err);

        });
    },

    listVoteWithUser: (request, reply) => {

        Models.Vote.findAndCountAll({
            include: [{
                model: Models.User,
                as: 'user',
                attributes: [
                    'name', 'nim', 'programStudi', 'status', 'tahunAngkatan', 'avatar'
                ]
            }]
        }).then((vote) => {

            if (!vote) {
                return reply(Boom.notFound('Vote does not exist.'));
            }

            return reply({
                statusCode: 200,
                total: vote.count,
                data: vote.rows
            }).code(200);

        }).catch((err) => {

            return reply(err);

        });
    },

    listVoteCandidateAhmad: (request, reply) => {

        Models.Vote.findAndCountAll({
            where: {
                vote: 1
            }
        }).then((vote) => {

            if (!vote) {
                return reply(Boom.notFound('Vote does not exist.'));
            }

            return reply({
                statusCode: 200,
                total: vote.count,
                data: vote.rows
            }).code(200);

        }).catch((err) => {

            return reply(err);

        });
    },

    listVoteCandidateKarim: (request, reply) => {

        Models.Vote.findAndCountAll({
            where: {
                vote: 2
            }
        }).then((vote) => {

            if (!vote) {
                return reply(Boom.notFound('Vote does not exist.'));
            }

            return reply({
                statusCode: 200,
                total: vote.count,
                data: vote.rows
            }).code(200);

        }).catch((err) => {

            return reply(err);

        });
    },

    createVote: (request, reply) => {

        const currentUser = request.auth.credentials.user;

        const attributes = request.payload;

        Models.Vote.findOne({
            where: {
                nim: currentUser.nim
            }
        }).then((vote, err) => {

            if (vote) {
                return reply(Boom.forbidden('Terima kasih, anda sebelumnya telah memberikan suara!'));
            }

            attributes.userId = currentUser.userId;
            attributes.nim = currentUser.nim;

            Models.Vote.create(attributes).then((vote) => {

                reply({
                    statusCode: 200,
                    data: vote
                }).code(200);

                Models.Vote.findAndCountAll({
                    where: {
                        vote: 1
                    }
                }).then((vote) => {

                    notifier.emit('listVoteCandidateAhmad', vote);

                })

                Models.Vote.findAndCountAll({
                    where: {
                        vote: 2
                    }
                }).then((vote) => {

                    notifier.emit('listVoteCandidateKarim', vote);

                })

            }).catch((err) => {

                return reply(err);

            });
        });

    }


};
