import {Context} from './Context';
import {Artifacts} from './collections';
import {Return} from './Response';

export type Container = {
    resolve(callables: Callables): unknown,
    get<T>(name: string | number): T,
    set(name: string | number, value: object): void,
}

export type Callables = (...deps) => unknown;

export type Resolvable = (fn: (
    {
        context,
        artifacts,
    }: Partial<{
        context: Context,
        artifacts: Artifacts,
    }>,
) => Promise<Return | string> | Return | string) => unknown;
