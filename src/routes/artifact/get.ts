import container from '#/container';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 30.01.2019
 * Time: 17:39
 */
export default container(async ({artifacts}) => {
    const data = artifacts.all()
        .map((artifact) => ({
            id: artifact._id,
            size: artifact.size,
            context: artifact.context,
        }))
    ;

    return {
        status: 'OK',
        data,
    };
});
