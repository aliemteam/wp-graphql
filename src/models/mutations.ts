import { GraphQLFieldConfigMap } from 'graphql';
import categoryMutation from './categories/categoryMutation';
import commentMutation from './comments/commentMutation';
import mediaMutation from './media/mediaMutation';
import pageMutation from './pages/pageMutation';
import postMutation from './posts/postMutation';
import revisionMutation from './revisions/revisionMutation';
import settingsMutation from './settings/settingsMutation';
import tagMutation from './tags/tagMutation';
import userMutation from './users/userMutation';

export default <GraphQLFieldConfigMap<any, any>>{
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
