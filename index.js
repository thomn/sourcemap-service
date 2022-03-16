#!/usr/bin/env node
const cwd = process.cwd();
process.chdir(__dirname);

require('ts-node').register({
    transpileOnly: true,
    require: [
        require.resolve('tsconfig-paths/register'),
    ],
});

process.chdir(cwd);

const {default: service} = require('./src/index');
service().catch(console.error);
