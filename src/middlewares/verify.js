const {send} = require('micro');
const {basename} = require('path');
const HTTPStatus = require('../lib/HTTPStatus');

/**
 *
 * @param next
 * @return {Function}
 */
const verify = (next) => ({req, res, query, ...rest}) => {
    const {n: name, v: version} = query;

    const bail = [
        // cant be null
        () => (!name),
        () => (!version),

        // cant be array
        () => (Array.isArray(name)),
        () => (Array.isArray(version)),

        // only numbers
        () => (version !== (parseInt(version) + '')),

        // only filenames
        () => (name !== basename(name)),

        // only alphanumerical values with extensions
        () => (name !== name.replace(/[^a-z0-9.\-_]/g, '')),
    ].some(
        (test) => test(),
    );

    if (bail) {
        return send(res, HTTPStatus.BAD_REQUEST);
    }

    return next({req, res, query, ...rest});
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 31.01.2019
 * Time: 11:34
 */
module.exports = verify;
