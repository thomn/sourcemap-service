// const {send} = require('micro');

/**
 *
 * @param next
 * @return {function({req: *, res: *, query: *}): *}
 */
const auth = (next) => ({req, res, query}) => {

    // todo
    // send(res, 403);

    return next({req, res, query});
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.12.2018
 * Time: 16:49
 */
module.exports = auth;
