let env = process.env.NODE_ENV || 'development';
let cfg = require('./config.' + env);

module.exports = cfg;