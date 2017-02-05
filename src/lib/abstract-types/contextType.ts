import { GraphQLEnumType } from 'graphql';

export const contextType = new GraphQLEnumType({
  name: 'Context',
  values: {
    edit: { value: 'edit' },
    embed: { value: 'embed' },
    view: { value: 'view' },
  },
});
