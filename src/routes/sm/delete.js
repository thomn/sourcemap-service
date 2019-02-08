const {send, sendError} = require('micro');
const HTTPStatus = require('../../lib/HTTPStatus');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 06.02.2019
 * Time: 09:15
 */
module.exports = async ({req, res, query, store}) => {
    const {v: version, n: name} = query;
    const file = store.get(version, name);

    if (!file) {
        return send(res, HTTPStatus.BAD_REQUEST);
    }

    try {
        const unlinked = file.unlink();

        if (unlinked) {
            store.delete(version, name)
        }

        return (unlinked)
            ? send(res, HTTPStatus.OK)
            : send(res, HTTPStatus.BAD_REQUEST)
        ;
    } catch (e) {
        return sendError(req, res, e);
    }
};
