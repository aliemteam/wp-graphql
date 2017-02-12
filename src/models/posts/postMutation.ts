import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLUnionType,
} from 'graphql';
import { openClosedType } from '../../lib/abstract-types/';
import { ArgumentField } from '../../lib/strongTypes';
import deletedObjectFactory, { DeletedObject } from '../../lib/type-factories/deletedObjectFactory';
import { postStatusType, Status } from '../post-statuses/postStatusType';
import postType, { Post } from './types/postType';

export const deletedPostType: GraphQLObjectType = deletedObjectFactory(postType);

export interface PostMutationOptions {
    /** The ID for the author of the object. */
    author?: number;
    /** The terms assigned to the object in the category taxonomy. */
    categories?: number[]; // FIXME: Check this
    /** Whether or not comments are open on the object. */
    comment_status?: 'open'|'closed';
    /** The content for the object. */
    content?: string;
    /** The date the object was published, in the site’s timezone. */
    date?: string;
    /** The date the object was published, as GMT. */
    date_gmt?: string;
    /** The excerpt for the object. */
    excerpt?: string;
    /** The ID of the featured media for the object. */
    featured_media?: number;
    /** The format for the object. */
    // format?: 'standard'; Not used for now -- Irrelevant
    /** The number of Liveblog Likes the post has. */
    liveblog_likes?: number;
    /** Meta fields. */
    meta?: any[]; // FIXME:
    /** A password to protect access to the content and excerpt. */
    password?: string;
    /** Whether or not the object can be pinged. */
    ping_status?: 'open'|'closed';
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: string;
    /** A named status for the object. */
    status?: Status;
    /** Whether or not the object should be treated as sticky. */
    sticky?: boolean;
    /** The terms assigned to the object in the post_tag taxonomy. */
    tags?: number[]; // FIXME: Check this
    /** The theme file to use to display the object. */
    template?: string;
    /** The title for the object. */
    title?: string;
}

type CreatePostArgs = PostMutationOptions & (
    Pick<PostMutationOptions, 'content'> | Pick<PostMutationOptions, 'excerpt'> | Pick<PostMutationOptions, 'title'>
);

const createPost: ArgumentField<CreatePostArgs, any, any> = {
    description: 'Create a post.',
    type: postType,
    args: {
        author: {
            description: 'The ID for the author of the object.',
            type: GraphQLInt,
        },
        categories: {
            description: 'The terms assigned to the object in the category taxonomy.',
            type: new GraphQLList(GraphQLInt),
        },
        comment_status: {
            description: 'Whether or not comments are open on the object.',
            type: openClosedType,
        },
        content: {
            description: 'The content for the object.',
            type: new GraphQLNonNull(GraphQLString),
        },
        date: {
            description: 'The date the object was published, in the site’s timezone.',
            type: GraphQLString,
        },
        date_gmt: {
            description: 'The date the object was published, as GMT.',
            type: GraphQLString,
        },
        excerpt: {
            description: 'The excerpt for the object.',
            type: GraphQLString,
        },
        featured_media: {
            description: 'The ID of the featured media for the object.',
            type: GraphQLInt,
        },
        liveblog_likes: {
            description: 'The number of Liveblog Likes the post has.',
            type: GraphQLInt,
        },
        meta: {
            description: 'Meta fields.',
            type: new GraphQLList(GraphQLString),
        },
        password: {
            description: 'A password to protect access to the content and excerpt.',
            type: GraphQLString,
        },
        ping_status: {
            description: 'Whether or not the object can be pinged.',
            type: openClosedType,
        },
        slug: {
            description: 'An alphanumeric identifier for the object unique to its type.',
            type: GraphQLString,
        },
        status: {
            description: 'A named status for the object.',
            type: postStatusType,
        },
        sticky: {
            description: 'Whether or not the object should be treated as sticky.',
            type: GraphQLBoolean,
        },
        tags: {
            description: 'The terms assigned to the object in the post_tag taxonomy.',
            type: new GraphQLList(GraphQLInt),
        },
        template: {
            description: 'The theme file to use to display the object.',
            type: GraphQLString,
        },
        title: {
            description: 'The title for the object.',
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve: (_root, args, context): PromiseLike<Post> => context.post('/posts', args),
};

type UpdatePostArgs = PostMutationOptions & { id: string };
const updatePost: ArgumentField<UpdatePostArgs, any, any> = {
    description: 'Update a post.',
    type: postType,
    args: {
        author: {
            description: '',
            type: GraphQLInt,
        },
        categories: {
            description: 'The terms assigned to the object in the category taxonomy.',
            type: new GraphQLList(GraphQLInt),
        },
        comment_status: {
            description: 'Whether or not comments are open on the object.',
            type: openClosedType,
        },
        content: {
            description: 'The content for the object.',
            type: GraphQLString,
        },
        date: {
            description: 'The date the object was published, in the site’s timezone.',
            type: GraphQLString,
        },
        date_gmt: {
            description: 'The date the object was published, as GMT.',
            type: GraphQLString,
        },
        excerpt: {
            description: 'The excerpt for the object.',
            type: GraphQLString,
        },
        featured_media: {
            description: 'The ID of the featured media for the object.',
            type: GraphQLInt,
        },
        id: {
            description: 'The ID of the post being updated',
            type: new GraphQLNonNull(GraphQLInt),
        },
        liveblog_likes: {
            description: 'The number of Liveblog Likes the post has.',
            type: GraphQLInt,
        },
        meta: {
            description: 'Meta fields.',
            type: new GraphQLList(GraphQLString),
        },
        password: {
            description: 'A password to protect access to the content and excerpt.',
            type: GraphQLString,
        },
        ping_status: {
            description: 'Whether or not the object can be pinged.',
            type: openClosedType,
        },
        slug: {
            description: 'An alphanumeric identifier for the object unique to its type.',
            type: GraphQLString,
        },
        status: {
            description: 'A named status for the object.',
            type: postStatusType,
        },
        sticky: {
            description: 'Whether or not the object should be treated as sticky.',
            type: GraphQLBoolean,
        },
        tags: {
            description: 'The terms assigned to the object in the post_tag taxonomy.',
            type: new GraphQLList(GraphQLInt),
        },
        template: {
            description: 'The theme file to use to display the object.',
            type: GraphQLString,
        },
        title: {
            description: 'The title for the object.',
            type: GraphQLString,
        },
    },
    resolve: (_root, { id, ...args }: UpdatePostArgs, context): PromiseLike<Post> => (
        context.post(`/posts/${id}`, args)
    ),
};

const deletePostResponseUnion = new GraphQLUnionType({
    name: 'DeletePostResponse',
    types: [ deletedPostType, postType ],
    resolveType: res => {
        if (res.deleted) {
            return deletedPostType;
        }
        return postType;
    },
});

export interface DeletePostArgs {
    /** Whether to bypass trash and force deletion. */
    force?: boolean;
    /** The ID of the post being deleted. */
    id: number;
}

const deletePost: ArgumentField<DeletePostArgs, any, any> = {
    description: 'Delete a single post by ID.',
    type: deletePostResponseUnion,
    args: {
        force: {
            description: 'Whether to bypass trash and force deletion.',
            type: GraphQLBoolean,
        },
        id: {
            description: 'The ID of the post being deleted.',
            type: new GraphQLNonNull(GraphQLInt),
        },
    },
    resolve: (_root, { id, ...args }: DeletePostArgs, context): PromiseLike<Post|DeletedObject<Post>> => (
        context.delete(`/posts/${id}`, args)
    ),
};

export default {
    createPost,
    deletePost,
    updatePost,
};
