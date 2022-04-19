/**
 *
 * @param props
 * @param object
 */
export const pick = (props: string[], object: object): object => {
    return props.reduce((acc, prop) => {
        if (object[prop]) {
            acc[prop] = object[prop];
        }

        return acc;
    }, {});
};
