import {
    GraphQLObjectType,
    GraphQLSchema,
} from 'graphql';
import categoryQuery from './categories/categoryQuery';
import commentQuery from './comments/commentQuery';
import mediaQuery from './media/mediaQuery';
import pageQuery from './pages/pageQuery';
import postStatusQuery from './post-statuses/postStatusQuery';
import postTypeQuery from './post-types/postTypeQuery';
import postQuery from './posts/postQuery';
import revisionQuery from './revisions/revisionQuery';
import settingsQuery from './settings/settingsQuery';
import tagQuery from './tags/tagQuery';
import taxonomyQuery from './taxonomies/taxonomyQuery';
import userQuery from './users/userQuery';

const queries = {
    ...categoryQuery,
    ...commentQuery,
    ...mediaQuery,
    ...pageQuery,
    ...postStatusQuery,
    ...postTypeQuery,
    ...postQuery,
    ...revisionQuery,
    ...settingsQuery,
    ...tagQuery,
    ...taxonomyQuery,
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
