import {Middleware} from 'types';

/**
 *
 */
const factory = async (): Promise<Middleware> => {
    return () => {
        return undefined;
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 21.01.2022
 * Time: 16:00
 */
export default factory;
