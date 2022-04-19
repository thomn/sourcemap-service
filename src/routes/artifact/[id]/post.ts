import container from '#/container';
import {pick} from '#/utils';

const WHITELIST = [
    'user',
    'version',
    'name',
];

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 30.01.2019
 * Time: 17:39
 */
export default container(async ({context, artifacts}) => {
    const {id} = context.get<{ id: string }>('param');
    const artifact = artifacts.get(id);
    if (!artifact) {
        return {
            status: 'NOT_FOUND',
        };
    }

    const data = context.get<string>('payload');
    const {$$file} = artifact;

    $$file.write(data);
    artifacts.update(id, {
        size: data.length,
        context: pick(WHITELIST, context.get<{}>('query')),
    });

    await artifacts.write();

    return {
        status: 'CREATED',
        data: id,
    };
});
