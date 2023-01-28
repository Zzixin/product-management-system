const mongoose = require('mongoose');

const connectionString =
  'mongodb+srv://Zixin:OCTjosue0mgXPVg3@chuwa.rawmtou.mongodb.net/?retryWrites=true&w=majority';

const connectToMongoose = () => {
  mongoose.connect(connectionString);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console), 'connection error');
  db.on('open', () => {
    console.log('connect to mongodb !');
  });
};

module.exports = connectToMongoose;
