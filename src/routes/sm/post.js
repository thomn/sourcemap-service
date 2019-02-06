const {json, send, sendError} = require('micro');
const {writeFileSync: write} = require('fs');
const HTTPStatus = require('../../lib/HTTPStatus');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 30.01.2019
 * Time: 17:39
 */
module.exports = async ({req, res, query, cache}) => {
    const {v: version, n: name} = query;
    const exists = cache.exists(version, name);

    if (exists) {
        return send(res, HTTPStatus.CONFLICT);
    }

    try {
        const filename = cache.create(version, name);

        if (!filename) {
            return send(res, HTTPStatus.CONFLICT);
        }

        const obj = await json(req, {limit: '10mb', encoding: 'utf8'});
        const file = JSON.stringify(obj);

        write(filename, file, 'utf8');

        return send(res, 201);
    } catch (e) {
        sendError(req, res, e);
    }
};
