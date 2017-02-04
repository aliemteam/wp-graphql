import {
    GraphQLObjectType,
    GraphQLSchema,
} from 'graphql';
import { pageQuery } from './pages/pageQuery';
import { postQuery } from './posts/postQuery';

const queries = {
    ...postQuery,
    ...pageQuery,
};

const query = new GraphQLObjectType({
    name: 'Query',
    description: 'The root query.',
    fields: () => queries,
});

export default new GraphQLSchema({
    query,
});
