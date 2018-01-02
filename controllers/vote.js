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
                vote: '09fc24d9-6165-4071-8ec3-83f66256a6b4'
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
                vote: 'fb468841-8143-4313-a90f-47e56c800c82'
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

        attributes.userId = currentUser.userId;
        attributes.nim = currentUser.nim;
        attributes.programStudi = currentUser.programStudi;
        attributes.tahunAngkatan = currentUser.tahunAngkatan;

        Models.Vote.findOne({
            where: {
                nim: currentUser.nim
            }
        }).then((vote, err) => {

            if (vote) {
                return reply(Boom.forbidden('Terima kasih, anda sebelumnya telah memberikan suara!'));
            }

            Models.Vote.create(attributes).then((vote) => {

                const voteCandidate = vote.vote;
                const programStudi = vote.programStudi;
                const tahunAngkatan = vote.tahunAngkatan;

                reply({
                    statusCode: 200,
                    data: vote
                }).code(200);

                switch (voteCandidate) {
                    case '09fc24d9-6165-4071-8ec3-83f66256a6b4':
                        Models.Vote.findAndCountAll({
                            where: {
                                vote: '09fc24d9-6165-4071-8ec3-83f66256a6b4'
                            }
                        }).then((vote) => {

                            notifier.emit('VoteAhmad', vote);

                        });
                        break;
                    case 'fb468841-8143-4313-a90f-47e56c800c82':
                        Models.Vote.findAndCountAll({
                            where: {
                                vote: 'fb468841-8143-4313-a90f-47e56c800c82'
                            }
                        }).then((vote) => {

                            notifier.emit('VoteKarim', vote);

                        });
                        break;
                }

                switch (programStudi) {
                    case 'Teknik Informatika':
                        Models.Vote.findAndCountAll({
                            where: {
                                programStudi: 'Teknik Informatika'
                            }
                        }).then((vote) => {

                            notifier.emit('VoteTI', vote);

                        });

                        break;
                    case 'Sistem Informasi':
                        Models.Vote.findAndCountAll({
                            where: {
                                programStudi: 'Sistem Informasi'
                            }
                        }).then((vote) => {

                            notifier.emit('VoteSI', vote);

                        });
                        break;
                }

                switch (tahunAngkatan) {
                    case '2014':
                        Models.Vote.findAndCountAll({
                            where: {
                                tahunAngkatan: 2014
                            }
                        }).then((vote) => {

                            notifier.emit('Vote2014', vote);

                        });

                        break;
                    case '2015':
                        Models.Vote.findAndCountAll({
                            where: {
                                tahunAngkatan: 2015
                            }
                        }).then((vote) => {

                            notifier.emit('Vote2015', vote);

                        });

                        break;
                    case '2016':
                        Models.Vote.findAndCountAll({
                            where: {
                                tahunAngkatan: 2016
                            }
                        }).then((vote) => {

                            notifier.emit('Vote2016', vote);

                        });

                        break;
                    case '2017':
                        Models.Vote.findAndCountAll({
                            where: {
                                tahunAngkatan: 2017
                            }
                        }).then((vote) => {

                            notifier.emit('Vote2017', vote);

                        });

                        break;
                }
            });

        }).catch((err) => {

            return reply(err);

        });

    }


};
