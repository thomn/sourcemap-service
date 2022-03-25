export type Context = {
    update(resource: Resource, value: any);
    get<T>(resource: Resource): T;
}

export const Resources = [
    'payload',
    'query',
    'param',
] as const;

export type Resource = typeof Resources[number];

export type State = {
    [key in Resource]: any;
}
