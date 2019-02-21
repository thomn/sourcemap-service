const {send} = require('micro');
const router = require('micro-r');
const {verify, store, logger} = require('./middlewares');
const {storeDirectory} = require('../config');

const {register, route, use} = router((req, res) => {
    send(res, 404);
});

if (process.env.NODE_ENV === 'production') {
    // router.use(auth);
    use(logger('combined'));
}

use(verify);
use(store(storeDirectory));
register('./src/routes');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = route;
