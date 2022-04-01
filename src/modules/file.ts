import {existsSync as exists, createReadStream, ReadStream, unlinkSync, writeFileSync} from 'fs';
import {capture} from '#/debug';
import type {File} from '#/types';

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
            if (!isValid(cursor)) {
                return false
            }

            unlinkSync(cursor);
        } catch (err) {
            capture(err);

            return false;
        }

        return true;
    };

    /**
     *
     */
    const read = (): false | ReadStream => {
        try {
            return isValid(cursor)
                && createReadStream(cursor)
            ;
        } catch (err) {
            capture(err);
        }

        return false;
    };

    /**
     *
     * @param buffer
     */
    const write = (buffer: string): boolean => {
        try {
            writeFileSync(cursor, buffer, 'utf8');
        } catch (err) {
            capture(err);

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
