const {send} = require('micro');
const {basename} = require('path');

/**
 *
 * @param next
 * @return {function({req: *, res: *, query: *}): *}
 */
const verify = (next) => ({req, res, query}) => {
    const {n: name, v: version} = query;

    if (!name || !version) {
        return send(res, 400);
    }

    const passed = [
        // only numbers
        (version === (parseInt(version) + '')),

        // only filenames
        (name === basename(name)),

        // only alphanumerical values with extensions
        (name === name.replace(/[^a-z0-9.\-_]/g, '')),
    ].every(Boolean);

    if (passed) {
        return next({req, res, query});
    }

    send(res, 400);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 31.01.2019
 * Time: 11:34
 */
module.exports = verify;
