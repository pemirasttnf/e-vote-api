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
{ method: 'POST',   path: apiUrl + '/auth/login/sisfo', config: { auth: false }, handler: Controllers.auth.loginSisfo },
{ method: 'GET',    path: apiUrl + '/users', config: { auth: false }, handler: Controllers.user.listUser },
{ method: 'GET',    path: apiUrl + '/votes', config: { auth: false }, handler: Controllers.vote.listVote },
{ method: 'POST',   path: apiUrl + '/votes', config: { auth: false }, handler: Controllers.vote.createVote },
{ method: 'GET',    path: apiUrl + '/votes/{voteUuid}', config: { auth: false }, handler: Controllers.vote.getVote },
{ method: 'DELETE', path: apiUrl + '/votes/{voteUuid}', config: { auth: false }, handler: Controllers.vote.deleteVote }

];
