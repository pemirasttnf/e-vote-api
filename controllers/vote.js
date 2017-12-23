'use strict';

const Models = require('../models');
const Boom = require('boom');

module.exports = {

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
                $or: [{ vote: 1 }, { vote: 2 }]
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
                $or: [{ vote: 3 }, { vote: 4 }]
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

        const currentUser = request.auth.credentials.checkUser;

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

                return reply({
                    statusCode: 200,
                    data: vote
                }).code(200);

            }).catch((err) => {

                return reply(err);

            });
        });

    },

    getVote: (request, reply) => {

        Models.Vote.findOne({
            where: {
                voteUuid: request.params.voteUuid
            }
        }).then((vote) => {

            if (!vote) {
                return reply(Boom.notFound('Vote does not exist.'));
            }

            return reply({
                statusCode: 200,
                data: vote
            }).code(200);

        }).catch((err) => {

            return reply(err);

        });
    },

    updateVote: (request, reply) => {

        Models.Vote.findOne({
            where: {
                voteUuid: request.params.voteUuid
            }
        }).then((vote, err) => {

            if (!vote) {
                return reply(Boom.notFound('Vote does not exist.'));
            }

            const attributes = request.payload;
            Models.Vote.update(attributes, {
                where: {
                    voteUuid: request.params.voteUuid
                }
            }).then((voteUpdate) => {

                return reply({
                    statusCode: 200,
                    message: 'Vote has been successfully updated'
                }).code(200);
            });

        }).catch((err) => {

            return reply(err);

        });
    },

    deleteVote: (request, reply) => {

        Models.Vote.findOne({
            where: {
                voteUuid: request.params.voteUuid
            }
        }).then((vote, err) => {

            if (!vote) {
                return reply(Boom.notFound('Vote does not exist.'));
            }

            Models.Vote.destroy({
                where: {
                    voteUuid: request.params.voteUuid
                }
            }).then((voteUpdate) => {

                return reply({
                    statusCode: 200,
                    message: 'Vote has been successfully deleted'
                }).code(200);
            });

        }).catch((err) => {

            return reply(err);

        });
    }



};
