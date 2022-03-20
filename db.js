'use strict';

const { Client } = require('pg');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./db.properties');

const client = new Client({
    user: properties.get('username'),
    host: properties.get('hostname'),
    database: properties.get('dbname'),
    password: properties.get('password'),
    port: properties.get('port'),
});

client.connect();

module.exports = client;