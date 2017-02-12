import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import categoryMutation from './categories/categoryMutation';
import categoryQuery from './categories/categoryQuery';
import commentMutation from './comments/commentMutation';
import commentQuery from './comments/commentQuery';
import mediaMutation from './media/mediaMutation';
import mediaQuery from './media/mediaQuery';
import pageMutation from './pages/pageMutation';
import pageQuery from './pages/pageQuery';
import postStatusQuery from './post-statuses/postStatusQuery';
import postTypeQuery from './post-types/postTypeQuery';
import postMutation from './posts/postMutation';
import postQuery from './posts/postQuery';
import revisionMutation from './revisions/revisionMutation';
import revisionQuery from './revisions/revisionQuery';
import settingsMutation from './settings/settingsMutation';
import settingsQuery from './settings/settingsQuery';
import tagMutation from './tags/tagMutation';
import tagQuery from './tags/tagQuery';
import taxonomyQuery from './taxonomies/taxonomyQuery';
import userMutation from './users/userMutation';
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

const mutations = {
    ...categoryMutation,
    ...commentMutation,
    ...mediaMutation,
    ...postMutation,
    ...pageMutation,
    ...revisionMutation,
    ...settingsMutation,
    ...tagMutation,
    ...userMutation,
};

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root mutation.',
    fields: () => mutations,
});

export default new GraphQLSchema({
    query,
    mutation,
});
