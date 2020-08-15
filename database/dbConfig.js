const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db_environment = process.env.DB_ENV || "development";

module.exports = knex(knexConfig[db_environment]);
