const {send, sendError, buffer} = require('micro');
const HTTPStatus = require('../../lib/HTTPStatus');
const OPTIONS = {limit: '10mb', encoding: 'utf8'};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 30.01.2019
 * Time: 17:39
 */
module.exports = async (req, res, query, {store}) => {
    const {v: version, n: name} = query;
    const exists = store.has(version, name);

    if (exists) {
        return send(res, HTTPStatus.CONFLICT);
    }

    try {
        const file = store.create(version, name);

        if (!file) {
            return send(res, HTTPStatus.CONFLICT);
        }

        const buffered = await buffer(req, OPTIONS);

        if (!(!!buffered && JSON.parse(buffered))) {
            return send(res, HTTPStatus.FORBIDDEN);
        }

        file.write(buffered);
        send(res, HTTPStatus.CREATED);
    } catch (e) {
        store.delete(version, name);

        sendError(req, res, e);
    }
};
