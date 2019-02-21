// const HTTPStatus = require('../lib/HTTPStatus');
// const {send} = require('micro');

/**
 *
 * @param next
 * @return {function(*=, *=, ...[*]): *}
 */
const auth = (next) => (req, res, ...rest) => {

    // todo
    // send(res, HTTPStatus.FORBIDDEN);

    return next(req, res, ...rest);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.12.2018
 * Time: 16:49
 */
module.exports = auth;
