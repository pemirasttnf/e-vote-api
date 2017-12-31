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

        attributes.userId = currentUser.userId;
        attributes.nim = currentUser.nim;
        attributes.programStudi = currentUser.programStudi;
        attributes.tahunAngkatan = currentUser.tahunAngkatan;

        Models.Vote.create(attributes).then((vote) => {

            const voteCandidate = vote.vote;
            const programStudi = vote.programStudi;
            const tahunAngkatan = vote.tahunAngkatan;

            reply({
                statusCode: 200,
                data: vote
            }).code(200);

            switch (voteCandidate) {
                case '1':
                    Models.Vote.findAndCountAll({
                        where: {
                            vote: 1
                        }
                    }).then((vote) => {

                        notifier.emit('listVoteCandidateAhmad', vote);

                    });
                    break;
                case '2':
                    Models.Vote.findAndCountAll({
                        where: {
                            vote: 2
                        }
                    }).then((vote) => {

                        notifier.emit('listVoteCandidateKarim', vote);

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

                        notifier.emit('getTI', vote);

                    });

                    break;
                case 'Sistem Informasi':
                    Models.Vote.findAndCountAll({
                        where: {
                            programStudi: 'Sistem Informasi'
                        }
                    }).then((vote) => {

                        notifier.emit('getSI', vote);

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

                        notifier.emit('get2014', vote);

                    });

                    break;
                case '2015':
                    Models.Vote.findAndCountAll({
                        where: {
                            tahunAngkatan: 2015
                        }
                    }).then((vote) => {

                        notifier.emit('get2015', vote);

                    });

                    break;
                case '2016':
                    Models.Vote.findAndCountAll({
                        where: {
                            tahunAngkatan: 2016
                        }
                    }).then((vote) => {

                        notifier.emit('get2016', vote);

                    });

                    break;
                case '2017':
                    Models.Vote.findAndCountAll({
                        where: {
                            tahunAngkatan: 2017
                        }
                    }).then((vote) => {

                        notifier.emit('get2017', vote);

                    });

                    break;
            }
        }).catch((err) => {

            return reply(err);

        });

        // Models.Vote.findOne({
        //     where: {
        //         nim: currentUser.nim
        //     }
        // }).then((vote, err) => {
        //
        //     if (vote) {
        //         return reply(Boom.forbidden('Terima kasih, anda sebelumnya telah memberikan suara!'));
        //     }
        //
        //
        // });

    }


};
