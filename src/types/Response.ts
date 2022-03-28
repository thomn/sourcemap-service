export {Response} from 'fsbr';

import type {Status} from '#/status';

export type Return = {
    status: keyof typeof Status,
    data?: any,
}
