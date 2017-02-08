import { GraphQLEnumType } from 'graphql';

export type Context = 'edit'|'embed'|'view';

export const contextType = new GraphQLEnumType({
  name: 'Context',
  values: {
    edit: { value: 'edit' },
    embed: { value: 'embed' },
    view: { value: 'view' },
  },
});
