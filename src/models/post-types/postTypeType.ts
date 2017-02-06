import {
    GraphQLBoolean,
    GraphQLList,
    GraphQLObjectType,
    GraphQLObjectTypeConfig,
    GraphQLString,
} from 'graphql';
import { PostLabels, postLabelsType } from '../../lib/abstract-types/';
import { TypedFields } from '../../lib/strongTypes';

export interface PostTypeBase<T> {
    /** A human-readable description of the resource. */
    description: string;
    /** Whether or not the resource should have children. */
    hierarchial: boolean;
    /** Human-readable labels for the resource for various contexts. */
    labels: PostLabels;
    /** The title for the resource. */
    name: string;
    /** The base URL for the REST call. */
    rest_base: string;
    /** An alphanumeric identifier for the resource. */
    slug: T;
    /** Associated taxonomies. */
    taxonomies: string[];
}

export interface PostTypeRaw<T> extends PostTypeBase<T> {
    /** All capabilities used by the resource. */
    capabilities: {
        [capabilityName: string]: string;
    };
}

export interface PostType<T> extends PostTypeBase<T> {
    /** All capabilities used by the resource. */
    capabilities: string[];
}

export interface PostTypeList {
    /** WordPress "Post" type */
    post: PostType<'post'>;
    /** WordPress "Page" type */
    page: PostType<'page'>;
    /** WordPress "Attachment" type */
    attachment: PostType<'attachment'>;
    [postTypeName: string]: PostType<string>;
}

type singleFields = TypedFields<PostTypeRaw<string>, PostTypeRaw<string>, {}>;
const singlePostTypeFields: singleFields = {
    capabilities: {
        description: 'All capabilities used by the resource.',
        type: new GraphQLList(GraphQLString),
        resolve: postType => Object.keys(postType.capabilities),
    },
    description: {
        description: 'A human-readable description of the resource.',
        type: GraphQLString,
    },
    hierarchial: {
        description: 'Whether or not the resource should have children.',
        type: GraphQLBoolean,
    },
    labels: {
        description: 'Human-readable labels for the resource for various contexts.',
        type: postLabelsType,
    },
    name: {
        description: 'The title for the resource.',
        type: GraphQLString,
    },
    rest_base: {
        description: 'The base URL for the REST call.',
        type: GraphQLString,
    },
    slug: {
        description: 'An alphanumeric identifier for the resource.',
        type: GraphQLString,
    },
    taxonomies: {
        description: 'Associated taxonomies.',
        type: new GraphQLList(GraphQLString),
    },
};

type singlePostTypeConfig = GraphQLObjectTypeConfig<PostType<string>, {}>;
export const postType = new GraphQLObjectType(<singlePostTypeConfig>{
    name: 'PostType',
    description: 'Object containing data for a single post type.',
    fields: () => ({
        ...singlePostTypeFields,
    }),
});

type postTypeListFields = TypedFields<PostTypeList, PostTypeList, {}>;
const postTypeFields: postTypeListFields = {
    post: {
        description: 'WordPress "Post" type',
        type: postType,
    },
    page: {
        description: 'WordPress "Page" type',
        type: postType,
    },
    attachment: {
        description: 'WordPress "Attachment" type',
        type: postType,
    },
};

type postTypeListConfig = GraphQLObjectTypeConfig<PostTypeList, {}>;
export const postTypeList = new GraphQLObjectType(<postTypeListConfig>{
    name: 'PostTypeList',
    description: 'Object containing all post types whos key names are the post type slug.',
    fields: () => ({
        ...postTypeFields,
    }),
});
