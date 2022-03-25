import {existsSync as exists} from 'fs';
import {createReadStream, ReadStream, unlinkSync, writeFileSync} from 'fs';
import type {File} from 'types';

/**
 *
 * @param cursor
 */
const factory = (cursor: string): File => {
    /**
     *
     * @param cursor
     */
    const isValid = (cursor: string): boolean => {
        return exists(cursor);
    };

    /**
     *
     */
    const unlink = (): boolean => {
        try {
            isValid(cursor)
                && unlinkSync(cursor)
            ;
        } catch (e) {
            return false;
        }

        return true;
    };

    /**
     *
     */
    const read = (): false | ReadStream => {
        return isValid(cursor)
            && createReadStream(cursor)
        ;
    };

    /**
     *
     * @param buffer
     */
    const write = (buffer: string): boolean => {
        try {
            writeFileSync(cursor, buffer, 'utf8');
        } catch (e) {
            return false;
        }

        return true;
    };

    /**
     *
     */
    const toString = (): string => {
        return cursor;
    };

    return {
        unlink,
        read,
        write,
        toString,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 22.11.2021
 * Time: 17:43
 */
export default factory;
