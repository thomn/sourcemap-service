const {resolve} = require('path');
const Store = require('../lib/Store');

/**
 *
 * @param path
 * @return {function(*): function(*=, *=, *=, *=): *}
 */
const factory = (path) => {
    const root = resolve(path);
    const store = (new Store(root))
        .initialise()
    ;

    return (next) => (req, res, query, container) => {
        container.store = store;

        return (
            next(req, res, query, container)
        );
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.02.2019
 * Time: 13:35
 */
module.exports = factory;
