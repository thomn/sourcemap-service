const {resolve} = require('path');
const Cache = require('../lib/Cache');

/**
 *
 * @param path
 * @return {function(*): function({req: *, res: *, query: *}): *}
 */
const factory = (path) => {
    const root = resolve(path);
    const cache = (new Cache(root))
        .initialise()
    ;

    return (next) => ({req, res, query}) => (
        next({req, res, query, cache})
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.02.2019
 * Time: 13:35
 */
module.exports = factory;
