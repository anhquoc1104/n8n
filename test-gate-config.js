require('reflect-metadata');
require('dotenv').config();
const { Container } = require('@n8n/di');
const { GlobalConfig } = require('./packages/@n8n/config/dist/index');

process.env.N8N_GATE_CODE = 'mysecret';

const config = Container.get(GlobalConfig);
console.log("Gate Code:", config.gate.code);
