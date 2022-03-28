import container from '#/container';

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

    const {data, context: meta} = context.get<{ data: string, context: object }>('payload');

    const {$$file} = artifact;
    $$file.write(data);
    artifacts.update(id, {
        context: meta,
        size: Buffer.byteLength(data, 'utf8'),
    });

    await artifacts.write();

    return {
        status: 'CREATED',
        data: id,
    };
});
