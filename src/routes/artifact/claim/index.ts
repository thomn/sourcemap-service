import {guard} from '#/middlewares';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 04.02.2022
 * Time: 23:58
 */
export default async (req, res, next) => (await guard())(req, res, next);
