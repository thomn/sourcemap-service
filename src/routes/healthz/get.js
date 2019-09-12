const send = require('micro');
const HTTPStatus = require('../../lib/HTTPStatus');

module.exports = async (req, res, query, {store}) => {
    try {
        const {v: version, n: name} = query;
        const exists = store.has(version, name);

        if (exists) {
            store.delete(version, name);
        }

        const file = store.create(version, name);

        if (!file.write()) {
            throw new Error();
        }

        res.end('ok');
    } catch (e) {
        send(res, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
};
