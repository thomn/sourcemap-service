const {send} = require('micro');
const Router = require('./lib/Router');
const {verify, auth, cache} = require('./middlewares');

const router = new Router((req, res) => {
    send(res, 404);
});

router.use(auth);
router.use(verify);
router.use(cache('./static'));
router.register('./src/routes');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 11.12.2018
 * Time: 19:26
 */
module.exports = (req, res) => router.route(req, res);
