'use strict';

const Models = require('../models');
const Boom = require('boom');

module.exports = {

    listCandidate: (request, reply) => {

        Models.Candidate.findAndCountAll().then((candidate) => {

            if (!candidate) {
                return reply(Boom.notFound('Candidate does not exist.'));
            }

            return reply({
                statusCode: 200,
                total: candidate.count,
                data: candidate.rows
            }).code(200);

        }).catch((err) => {

            return reply(err);

        });
    }

};
