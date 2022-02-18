import sevl from 'sevl';
import {Config} from 'types';

/**
 *
 */
const factory = () => {
    let config: Config;

    return async (): Promise<Config> => {
        if (config) {
            return config;
        }

        const {
            PORT = 3000,
            STORE_DIRECTORY = './store',
            DEBUG = 'false',
        } = await sevl();

        return config = {
            PORT,
            STORE_DIRECTORY,
            DEBUG,
        };
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 27.01.2022
 * Time: 08:44
 */
export default factory();
