import {
    GraphQLObjectType,
    GraphQLSchema,
} from 'graphql';
import pageQuery from './pages/pageQuery';
import postQuery from './posts/postQuery';
import revisionQuery from './revisions/revisionQuery';

const queries = {
    ...postQuery,
    ...pageQuery,
    ...revisionQuery,
};

const query = new GraphQLObjectType({
    name: 'Query',
    description: 'The root query.',
    fields: () => queries,
});

export default new GraphQLSchema({
    query,
});
