import mongoose from 'mongoose';

import config from '../config/config.json';

const gracefulShutdown = (message, callback) => {
  mongoose.connection.close(() => {
    console.log(message);
    callback();
  });
};
mongoose.connect(config.dbURI);

mongoose.connection.on('connected', () => {
  console.log('[MongoDB]: Successfully connected to MongoDB');
});

mongoose.connection.on('disconnected', () => {
  console.log('[MongoDB]: Disconnected from MongoDB!!!');
});

mongoose.connection.on('error', (err) => {
  console.log('[MongoDB]:  Error occured while connecting to MongoDB=> ', err);
});

process.on('SIGINT', () => {
  gracefulShutdown('Node process shutdown', () => {
    process.exit(0);
  });
});

process.once('SIGUSR2', () => {
  gracefulShutdown('Nodemon shutdown', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

import './users';
