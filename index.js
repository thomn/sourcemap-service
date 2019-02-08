#!/usr/bin/env node

const micro = require('micro');
const router = require('./src/router');
const {version} = require('./package');
const {port} = require('./config');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
const server = micro(router);
server.listen(port, () => {
    console.info(`> sourcemap-service:${version} listening on port ${port}`);
});
