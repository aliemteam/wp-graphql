import {
    GraphQLObjectType,
    GraphQLSchema,
} from 'graphql';
import categoryQuery from './categories/categoryQuery';
import pageQuery from './pages/pageQuery';
import postTypeQuery from './post-types/postTypeQuery';
import postQuery from './posts/postQuery';
import revisionQuery from './revisions/revisionQuery';
import userQuery from './users/userQuery';

const queries = {
    ...categoryQuery,
    ...pageQuery,
    ...postTypeQuery,
    ...postQuery,
    ...revisionQuery,
    ...userQuery,
};

const query = new GraphQLObjectType({
    name: 'Query',
    description: 'The root query.',
    fields: () => queries,
});

export default new GraphQLSchema({
    query,
});
