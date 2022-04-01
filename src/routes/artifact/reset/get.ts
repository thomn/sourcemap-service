import container from '#/container';
import config from '#/config';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.04.2022
 * Time: 12:21
 */
export default container(async ({context, artifacts}) => {
    const {API_TOKEN} = await config();
    const {token} = context.get<{ token: string }>('query');
    if (!token || !API_TOKEN || (token !== API_TOKEN)) {
        return {
            status: 'BAD_REQUEST',
        };
    }

    if (artifacts.count() <= 0) {
        return {
            status: 'OK',
        };
    }

    artifacts.all().map((artifact) => {
        const {$$file} = artifact;
        $$file.unlink();
    });


    artifacts.reset();
    await artifacts.write();

    return {
        status: 'OK',
    };
});
