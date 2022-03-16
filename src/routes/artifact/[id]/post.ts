import container from 'container';

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

    const body = context.get<string>('body');

    const {$$file} = artifact;
    $$file.write(body);

    return {
        status: 'CREATED',
        data: id,
    };
});
