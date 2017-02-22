import { GraphQLEnumType } from 'graphql';

export type OpenOrClosed = 'open'|'closed';

export const openClosedType = new GraphQLEnumType({
    name: 'OpenOrClosed',
    values: {
        open: { value: 'open' },
        closed: { value: 'closed' },
    },
});
