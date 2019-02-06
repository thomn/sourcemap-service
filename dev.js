const {resolve} = require('path');
const micro = require('micro-dev/lib/serve');

const path = resolve(process.cwd(), './src/router');
const flags = {
	silent: false,
	host: 'localhost',
	port: 8080,
    limit: '10mb',
	_: {},
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 05.02.2019
 * Time: 16:44
 */
micro(path, flags);
