import {
    GraphQLObjectType,
    GraphQLSchema,
} from 'graphql';

import { postQuery } from './models/posts/postQuery';

const queries = {
    ...postQuery,
};

const query = new GraphQLObjectType({
    name: 'Query',
    description: 'The root query.',
    fields: () => queries,
});

export default new GraphQLSchema({
    query,
});
