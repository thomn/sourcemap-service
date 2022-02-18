import teda, {Format} from 'teda';
import {Middleware} from 'types';

/**
 *
 */
const factory = async (): Promise<Middleware> => {
    /**
     *
     * @param req
     */
    const skip = (req) => {
        const {url} = req;
        if (url === '/favicon.ico') {
            return true;
        }

        return false;
    };

    return teda(Format.TINY, {
        skip,
    });
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.11.2021
 * Time: 12:57
 */
export default factory;
