import router from '#/router';
import {server} from '#/modules';
import config from '#/config';
import {capture} from '#/debug';

const {name, version} = require('../package.json');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 10.12.2021
 * Time: 11:32
 */
export default async () => {
    const {PORT} = await config();

    return server(name, version)
        .serve(await router())
        .listen(PORT)
        .catch((e) => capture(e))
    ;
};
