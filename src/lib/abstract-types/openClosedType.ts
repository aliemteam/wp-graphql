import { GraphQLEnumType } from 'graphql';

export const openClosedType = new GraphQLEnumType({
    name: 'OpenOrClosed',
    values: {
        open: { value: 'open' },
        closed: { value: 'closed' },
    },
});
