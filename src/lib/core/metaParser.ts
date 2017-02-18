/**
 * Receives a GraphQL response as input, recurses the object to find
 * an object with the property "meta", and `JSON.parse()`s each one it finds.
 * @param input  An `Object` or `Array` of any shape.
 * @returns      The input with all `meta` properties parsed as JSON.
 */
export default function parseMeta(input: object|any[]) {
    if (Array.isArray(input)) {
        return input.map(i => {
            if (typeof i === 'object' && i !== null) {
                return parseMeta(i);
            }
            return i;
        });
    }
    return Object.keys(input).reduce((prev, curr) => {
        if (typeof input[curr] === 'object' && input[curr] !== null) {
            return { ...prev, [curr]: parseMeta(input[curr]) };
        }
        return {
            ...prev,
            [curr]: curr === 'meta'
                ? JSON.parse(input[curr])
                : input[curr],
        };
    }, {});
}
