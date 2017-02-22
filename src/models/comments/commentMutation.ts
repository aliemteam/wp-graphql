import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLUnionType,
} from 'graphql';
import { namespace as NS } from '../../lib/constants';
import { ArgumentField } from '../../lib/strongTypes';
import deletedObjectFactory, { DeletedObject } from '../../lib/type-factories/deletedObjectFactory';
import commentKind from './types/commentKindType';
import commentStatusType from './types/commentStatusType';
import commentType, { Comment, MutableCommentOptions } from './types/commentType';

export const deletedCommentType: GraphQLObjectType = deletedObjectFactory(commentType);

export interface AddCommentArgs extends Partial<MutableCommentOptions> {
    /** Required: The content for the object. */
    content: string;
    /** JSON stringified meta fields. */
    meta?: string;
    /** Required: The id of the associated post object. */
    post: number;
}

const addComment: ArgumentField<AddCommentArgs> = {
    description: 'Create a new comment',
    type: commentType,
    args: {
        author: {
            description: 'The id of the user object, if author was a user.',
            type: GraphQLInt,
        },
        author_email: {
            description: 'Email address for the object author.',
            type: GraphQLString,
        },
        author_ip: {
            description: 'IP address for the object author (IPv6).',
            type: GraphQLString,
        },
        author_name: {
            description: 'Display name for the object author.',
            type: GraphQLString,
        },
        author_url: {
            description: 'URL for the object author.',
            type: GraphQLString,
        },
        content: {
            description: 'The content for the object.',
            type: new GraphQLNonNull(GraphQLString),
        },
        date: {
            description: 'The date the object was published.',
            type: GraphQLString,
        },
        date_gmt: {
            description: 'The date the object was published as GMT.',
            type: GraphQLString,
        },
        karma: {
            description: 'Karma for the object.',
            type: GraphQLInt,
        },
        meta: {
            description: 'JSON stringified meta fields.',
            type: GraphQLString,
        },
        parent: {
            description: 'The id for the parent of the object.',
            type: GraphQLInt,
        },
        post: {
            description: 'The id of the associated post object.',
            type: new GraphQLNonNull(GraphQLInt),
        },
        status: {
            description: 'State of the object.',
            type: commentStatusType,
        },
        type: {
            description: 'Type of Comment for the object.',
            type: commentKind,
        },
    },
    resolve: (root, args: MutableCommentOptions): PromiseLike<Comment> => (
        root.post(`/${NS}/comments`, args)
    ),
};

export interface UpdateCommentArgs extends Partial<MutableCommentOptions> {
    /** Required: The ID of the comment to be updated. */
    id: number;
    /** JSON stringified meta fields. */
    meta?: string;
}

const updateComment: ArgumentField<UpdateCommentArgs> = {
    description: 'Update a comment by ID.',
    type: commentType,
    args: {
        author: {
            description: 'The id of the user object, if author was a user.',
            type: GraphQLInt,
        },
        author_email: {
            description: 'Email address for the object author.',
            type: GraphQLString,
        },
        author_ip: {
            description: 'IP address for the object author (IPv6).',
            type: GraphQLString,
        },
        author_name: {
            description: 'Display name for the object author.',
            type: GraphQLString,
        },
        author_url: {
            description: 'URL for the object author.',
            type: GraphQLString,
        },
        content: {
            description: 'The content for the object.',
            type: GraphQLString,
        },
        date: {
            description: 'The date the object was published.',
            type: GraphQLString,
        },
        date_gmt: {
            description: 'The date the object was published as GMT.',
            type: GraphQLString,
        },
        id: {
            description: 'Required: The ID of the comment to be updated.',
            type: new GraphQLNonNull(GraphQLInt),
        },
        karma: {
            description: 'Karma for the object.',
            type: GraphQLInt,
        },
        meta: {
            description: 'JSON stringified meta fields.',
            type: GraphQLString,
        },
        parent: {
            description: 'The id for the parent of the object.',
            type: GraphQLInt,
        },
        post: {
            description: 'The id of the associated post object.',
            type: GraphQLInt,
        },
        status: {
            description: 'State of the object.',
            type: commentStatusType,
        },
        type: {
            description: 'Type of Comment for the object.',
            type: commentKind,
        },
    },
    resolve: (root, { id, ...args }: UpdateCommentArgs): PromiseLike<Comment> => (
        root.post(`/${NS}/comments/${id}`, args)
    ),
};

const deleteCommentResponseUnion = new GraphQLUnionType({
    name: 'DeleteCommentResponse',
    types: [ deletedCommentType, commentType ],
    resolveType: res => {
        if (res.deleted) {
            return deletedCommentType;
        }
        return commentType;
    },
});

export interface DeleteCommentArgs {
    /** Whether to bypass trash and force deletion. */
    force?: boolean;
    /** The ID of the comment being deleted. */
    id: number;
}

const deleteComment: ArgumentField<DeleteCommentArgs> = {
    description: 'Delete a comment by ID.',
    type: deleteCommentResponseUnion,
    args: {
        force: {
            description: 'Whether to bypass trash and force deletion.',
            type: GraphQLBoolean,
        },
        id: {
            description: 'The ID of the comment being deleted.',
            type: new GraphQLNonNull(GraphQLInt),
        },
    },
    resolve: (root, { id, ...args }: DeleteCommentArgs): PromiseLike<Comment|DeletedObject<Comment>> => (
        root.delete(`/${NS}/comments/${id}`, args)
    ),
};

export default {
    addComment,
    updateComment,
    deleteComment,
};
