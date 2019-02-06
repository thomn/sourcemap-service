const {send, sendError} = require('micro');
const HTTPStatus = require('../../lib/HTTPStatus');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 30.01.2019
 * Time: 17:39
 */
module.exports = async ({req, res, query, store}) => {
    const {v: version, n: name} = query;
    const file = store.get(version, name);

    if (!file) {
        return send(res, HTTPStatus.NOT_FOUND);
    }

    try {
        const buffer = file.read();

        send(res, HTTPStatus.OK, buffer);
    } catch (e) {
        sendError(req, res, e);
    }
};
