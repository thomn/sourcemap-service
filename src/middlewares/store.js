const {resolve} = require('path');
const Store = require('../lib/Store');

/**
 *
 * @param path
 * @return {function(*): function({req: *, res: *, [p: string]: *}): *}
 */
const factory = (path) => {
    const root = resolve(path);
    const store = (new Store(root))
        .initialise()
    ;

    return (next) => ({req, res, ...rest}) => (
        next({req, res, store, ...rest})
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.02.2019
 * Time: 13:35
 */
module.exports = factory;
