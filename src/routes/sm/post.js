const {json, send, sendError} = require('micro');
const {writeFileSync: write} = require('fs');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 30.01.2019
 * Time: 17:39
 */
module.exports = async ({req, res, query, cache}) => {
    const {v: version, n: name} = query;
    const exists = cache.exists(version, name);

    if (exists) {
        return send(res, 409);
    }

    try {
        const filename = cache.create(version, name);

        if (!filename) {
            return send(res, 409);
        }

        const obj = await json(req, {limit: '10mb', encoding: 'utf8'});
        const file = JSON.stringify(obj);

        write(filename, file, 'utf8');

        return send(res, 201);
    } catch (e) {
        sendError(req, res, e);
    }
};
