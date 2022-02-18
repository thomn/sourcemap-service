import {resolve} from 'path';
import fsbr from 'fsbr';
import {container, context, sinkhole, logger, store} from 'middlewares';
import config from 'config';

/**
 *
 */
const factory = async () => {
    const {STORE_DIRECTORY, DEBUG} = await config();

    const {register, route, use} = fsbr({
        ext: '.ts',
        dev: JSON.parse(DEBUG || 'false'),
    });

    use(await container());
    use(await context());
    use(await logger());
    use(await store(STORE_DIRECTORY));

    const path = resolve(__dirname, 'routes');
    await register(path);

    use(await sinkhole());

    return route;
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.02.2022
 * Time: 20:42
 */
export default factory;
