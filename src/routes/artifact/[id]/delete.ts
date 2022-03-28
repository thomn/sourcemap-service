import container from '#/container';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 27.12.2021
 * Time: 12:00
 */
export default container(async ({context, artifacts}) => {
    const {id} = context.get<{ id: string }>('param');
    const artifact = artifacts.get(id);
    if (!artifact) {
        return {
            status: 'NOT_FOUND',
        };
    }

    const {$$file} = artifact;
    $$file.unlink();

    artifacts.remove(id);
    await artifacts.write();

    return {
        status: 'OK',
    };
});
