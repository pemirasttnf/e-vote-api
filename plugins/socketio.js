'use strict';

const vote     = require('../controllers/vote').notifier;

exports.register = function (server, options, next) {

    const io = require('socket.io')(server.select('websocket').listener);

    io.on('connection', (socket) => {

        console.log(`Websocket running at: ${server.select('websocket').info.uri}`);

        console.log(`Socket ${socket.id} connected !`);

        socket.emit('message',{ message: 'Hello From Server :)' });

        vote.on('listVoteCandidateAhmad', (data) => {
            socket.emit('listVoteCandidateAhmad', data);
            socket.emit('getVote', data);
        });

        vote.on('listVoteCandidateKarim', (data) => {
            socket.emit('listVoteCandidateKarim', data);
            socket.emit('getVote', data);
        });

        //Tell all clients that someone connected
        // socket.emit('userJoined', socket.id);


    });

    next();
};

exports.register.attributes = {
    name: 'socketio'
};
