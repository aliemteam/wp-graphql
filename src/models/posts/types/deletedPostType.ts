import { GraphQLBoolean, GraphQLObjectType } from 'graphql';
import { TypedFields } from '../../../lib/strongTypes';
import postType, { Post } from './postType';

export interface DeletedPost {
    /** Boolean (usually true) stating if the post has been deleted. */
    deleted: boolean;
    /** The entire deleted post object. */
    previous: Post;
}

const deletedPostFields: TypedFields<DeletedPost, DeletedPost, {}> = {
    deleted: {
        description: 'Boolean (usually true) stating if the post has been deleted.',
        type: GraphQLBoolean,
    },
    previous: {
        description: 'The entire deleted post object.',
        type: postType,
    },
};

export default new GraphQLObjectType({
    name: 'DeletedPost',
    description: 'An object representing the API response for a deleted post.',
    fields: () => ({
        ...deletedPostFields,
    }),
});
