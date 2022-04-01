import {Context} from './Context';
import {Artifacts} from './collections';
import {Return} from './Response';

export type Resolvable = (fn: (
    {
        context,
        artifacts,
    }: Partial<{
        context: Context,
        artifacts: Artifacts,
    }>,
) => Promise<Return | string> | Return | string) => unknown;
