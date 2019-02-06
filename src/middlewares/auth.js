// const HTTPStatus = require('../lib/HTTPStatus');
// const {send} = require('micro');

/**
 *
 * @param next
 * @return {function({req: *, res: *, query: *}): *}
 */
const auth = (next) => ({req, res, query}) => {

    // todo
    // send(res, HTTPStatus.FORBIDDEN);

    return next({req, res, query});
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.12.2018
 * Time: 16:49
 */
module.exports = auth;
