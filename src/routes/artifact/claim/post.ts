import {join} from 'path';
import container from '#/container';
import {file} from '#/modules';
import config from '#/config';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.12.2021
 * Time: 19:46
 */
export default container(async ({artifacts, context}) => {
    const crc = context.get<string>('payload');
    const [candidate] = artifacts.query()
        .eq('crc', crc)
        .get()
    ;

    if (candidate) {
        return {
            status: 'BAD_REQUEST',
            data: candidate._id,
        };
    }

    const {STORE_DIRECTORY} = await config();
    const point = join(STORE_DIRECTORY, crc);

    const id = artifacts.add({
        crc,
        $$file: file(point),
    });

    await artifacts.write();

    return {
        status: 'OK',
        data: id,
    };
});
