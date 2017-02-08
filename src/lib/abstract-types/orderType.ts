import { GraphQLEnumType } from 'graphql';

export type Order = 'asc'|'desc';

export const orderType = new GraphQLEnumType({
  name: 'Order',
  values: {
    asc: { value: 'asc' },
    desc: { value: 'desc' },
  },
});
