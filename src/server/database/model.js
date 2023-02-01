const mongoose = require('mongoose');
const { userSchema, productSchema } = require('./schema');

const User = mongoose.model('Data', userSchema);
const Product = mongoose.model('Product', productSchema);
module.exports = { User, Product };
