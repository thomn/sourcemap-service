import {get} from 'container';
import type {Middleware, Context} from 'types';

const HEX_REGEX = /^[0-9a-f]+$/gi;

/**
 *
 */
const factory = async (): Promise<Middleware> => {
    /**
     *
     */
    const isValid = (hex: string): boolean => {
        return (new RegExp(HEX_REGEX)).test(hex);
    };

    /**
     *
     */
    return (req, res, next) => {
        const context = get<Context>('context');
        const payload = context.get<{ data: { crc: string } }>('payload');
        const crc = payload?.data?.crc;
        if (isValid(crc)) {
            return next();
        }

        throw new Error('error');
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 29.01.2022
 * Time: 17:00
 */
export default factory;
