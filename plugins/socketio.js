'use strict';

const vote     = require('../controllers/vote').notifier;

exports.register = function (server, options, next) {

    const io = require('socket.io')(server.select('websocket').listener);

    io.on('connection', (socket) => {

        console.log(`Websocket running at: ${server.select('websocket').info.uri}`);

        console.log(`Socket ${socket.id} connected !`);

        socket.emit('message',{ message: 'Hello From Server :)' });

        vote.on('listVoteCandidateAhmad', (data) => {
            socket.emit('listVoteCandidateAhmad', {
                result: data,
                relativeTime: new Date().toLocaleString()
            });
            // socket.emit('getVote', data);
        });

        vote.on('listVoteCandidateKarim', (data) => {
            socket.emit('listVoteCandidateKarim', {
                result: data,
                relativeTime: new Date().toLocaleString()
            });

            // socket.emit('getVote', data);
        });

        vote.on('getTI', (data) => {
            socket.emit('getTI', {
                result: data,
                relativeTime: new Date().toLocaleString()
            });
        });

        vote.on('getSI', (data) => {
            socket.emit('getSI', {
                result: data,
                relativeTime: new Date().toLocaleString()
            });
        });

        vote.on('get2014', (data) => {
            socket.emit('get2014', {
                result: data,
                relativeTime: new Date().toLocaleString()
            });
        });

        vote.on('get2015', (data) => {
            socket.emit('get2015', {
                result: data,
                relativeTime: new Date().toLocaleString()
            });
        });

        vote.on('get2016', (data) => {
            socket.emit('get2016', {
                result: data,
                relativeTime: new Date().toLocaleString()
            });
        });

        vote.on('get2017', (data) => {
            socket.emit('get2017', {
                result: data,
                relativeTime: new Date().toLocaleString()
            });
        });


        // Tell all clients that someone connected
        // socket.emit('userJoined', socket.id);


    });

    next();
};

exports.register.attributes = {
    name: 'socketio'
};
