const {send} = require('micro');
const Router = require('./lib/Router');
const {verify, store, logger} = require('./middlewares');
const {storeDirectory} = require('../config');

const router = new Router((req, res) => {
    send(res, 404);
});

if (process.env.NODE_ENV === 'production') {
    // router.use(auth);
    router.use(logger('combined'));
}

router.use(verify);
router.use(store(storeDirectory));
router.register('./src/routes');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = (req, res) => router.route(req, res);
