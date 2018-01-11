'use strict';

const Controllers = require('../controllers');
// const Validation    = require('../validation');
const Pkg = require('../package.json');
const apiUrl = '/api/v1';

module.exports = [{
    method: 'GET',
    path: apiUrl,
    config: {
        auth: false
    },
    handler: (request, reply) => {

        return reply({
            name: Pkg.name,
            version: Pkg.version
        });

    }
},

{ method: 'POST',   path: apiUrl + '/auth/register', config: { auth: false }, handler: Controllers.auth.register },
{ method: 'POST',   path: apiUrl + '/auth/login', config: { auth: false }, handler: Controllers.auth.login },
{ method: 'GET',    path: apiUrl + '/candidates', config: { auth: false }, handler: Controllers.candidate.listCandidate },
{ method: 'GET',    path: apiUrl + '/voters', config: { auth: false }, handler: Controllers.user.listUser },
{ method: 'GET',    path: apiUrl + '/votes', config: { auth: false }, handler: Controllers.vote.listVote },
{ method: 'GET',    path: apiUrl + '/votes/TI', config: { auth: false }, handler: Controllers.vote.listVoteTI },
{ method: 'GET',    path: apiUrl + '/votes/SI', config: { auth: false }, handler: Controllers.vote.listVoteSI },
{ method: 'GET',    path: apiUrl + '/votes/2012', config: { auth: false }, handler: Controllers.vote.listVote2012 },
{ method: 'GET',    path: apiUrl + '/votes/2013', config: { auth: false }, handler: Controllers.vote.listVote2013 },
{ method: 'GET',    path: apiUrl + '/votes/2014', config: { auth: false }, handler: Controllers.vote.listVote2014 },
{ method: 'GET',    path: apiUrl + '/votes/2015', config: { auth: false }, handler: Controllers.vote.listVote2015 },
{ method: 'GET',    path: apiUrl + '/votes/2016', config: { auth: false }, handler: Controllers.vote.listVote2016 },
{ method: 'GET',    path: apiUrl + '/votes/2017', config: { auth: false }, handler: Controllers.vote.listVote2017 },
{ method: 'GET',    path: apiUrl + '/votes/ahmad/total', config: { auth: false }, handler: Controllers.vote.listVoteCandidateAhmad },
{ method: 'GET',    path: apiUrl + '/votes/karim/total', config: { auth: false }, handler: Controllers.vote.listVoteCandidateKarim },
{ method: 'GET',    path: apiUrl + '/votes/voters', config: { auth: false }, handler: Controllers.vote.listVoteWithUser },
{ method: 'POST',   path: apiUrl + '/votes', handler: Controllers.vote.createVote }

];
