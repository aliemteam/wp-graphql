import { GraphQLEnumType } from 'graphql';

export const orderByFactory = (name: string, vals: string[]): GraphQLEnumType => new GraphQLEnumType({
    name,
    description: `Accepts one of the following (unquoted) strings: ${vals.join(', ')}`,
    values: vals.reduce((prev, curr) => {
        prev[curr] = { value: curr };
        return prev;
    }, {}),
});
