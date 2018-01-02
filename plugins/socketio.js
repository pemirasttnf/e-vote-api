'use strict';

const vote     = require('../controllers/vote').notifier;
const user     = require('../controllers/auth').notifier;
const Moment   = require('moment');

exports.register = function (server, options, next) {

    const io = require('socket.io')(server.select('websocket').listener);

    // turn off debug
    // io.set('log level', 1);

    io.on('connection', (socket) => {

        console.log(`Websocket running at: ${server.select('websocket').info.uri}`);

        console.log(`Socket ${socket.id} connected !`);

        socket.emit('message',{ message: 'Hello From Server :)' });

        // setInterval(() => {
        //     socket.emit('stream', { 'title': 'A new title via Socket.IO!' });
        // }, 1000);


        vote.on('VoteAhmad', (data) => {
            socket.emit('VoteAhmad', {
                result: data,
                relativeTime: Moment(data.createdAt).startOf('hour').fromNow()
            });
        });

        vote.on('VoteKarim', (data) => {
            socket.emit('VoteKarim', {
                result: data,
                relativeTime: Moment().startOf('hour').fromNow()
            });
        });

        vote.on('VoteTI', (data) => {
            socket.emit('VoteTI', {
                result: data,
                relativeTime: Moment().startOf('hour').fromNow()
            });
        });

        vote.on('VoteSI', (data) => {
            socket.emit('VoteSI', {
                result: data,
                relativeTime: Moment().startOf('hour').fromNow()
            });
        });

        vote.on('Vote2014', (data) => {
            socket.emit('Vote2014', {
                result: data,
                relativeTime: Moment().startOf('hour').fromNow()
            });
        });

        vote.on('Vote2015', (data) => {
            socket.emit('Vote2015', {
                result: data,
                relativeTime: Moment().startOf('hour').fromNow()
            });
        });

        vote.on('Vote2016', (data) => {
            socket.emit('Vote2016', {
                result: data,
                relativeTime: Moment().startOf('hour').fromNow()
            });
        });

        vote.on('Vote2017', (data) => {
            socket.emit('Vote2017', {
                result: data,
                relativeTime: Moment().startOf('hour').fromNow()
            });
        });

        user.on('RegisterUniqueCode', (data) => {
            socket.emit('RegisterUniqueCode', {
                result: data,
                relativeTime: Moment().startOf('hour').fromNow()
            });
        });

        user.on('RegisterVoterTotal', (data) => {
            socket.emit('RegisterVoterTotal', {
                result: data,
                relativeTime: Moment().startOf('hour').fromNow()
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
