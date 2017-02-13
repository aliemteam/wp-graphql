import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

export type Meta = Array<{ key: string, value: string|number|boolean }>;
export interface RawMeta {
    [k: string]: (number|string|boolean)|Array<(number|string|boolean)>;
}

export default new GraphQLObjectType({
    name: 'Meta',
    description: 'Array of "key", "value" objects',
    fields: () => ({
        key: {
            description: 'The key of the meta field.',
            type: GraphQLString,
        },
        value: {
            description: 'String value of the meta field',
            type: GraphQLString,
        },
    }),
});
