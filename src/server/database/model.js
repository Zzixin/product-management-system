const mongoose = require('mongoose');
const dataSchema = require('./schema');

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;
