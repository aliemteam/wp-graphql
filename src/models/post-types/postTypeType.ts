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
    description: string;
    hierarchial: boolean;
    labels: PostLabels;
    name: string;
    rest_base: string;
    slug: T;
    taxonomies: string[];
}

export interface PostTypeRaw<T> extends PostTypeBase<T> {
    capabilities: {
        [capabilityName: string]: string;
    };
}

export interface PostType<T> extends PostTypeBase<T> {
    capabilities: string[];
}

export interface PostTypeList {
    post: PostType<'post'>;
    page: PostType<'page'>;
    attachment: PostType<'attachment'>;
    [postTypeName: string]: PostType<string>;
}

type singleFields = TypedFields<PostTypeRaw<string>, PostTypeRaw<string>, {}>;
const singlePostTypeFields: singleFields = {
    capabilities: {
        type: new GraphQLList(GraphQLString),
        resolve: postType => Object.keys(postType.capabilities),
    },
    description: {
        type: GraphQLString,
    },
    hierarchial: {
        type: GraphQLBoolean,
    },
    labels: {
        type: postLabelsType,
    },
    name: {
        type: GraphQLString,
    },
    rest_base: {
        type: GraphQLString,
    },
    slug: {
        type: GraphQLString,
    },
    taxonomies: {
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
        type: postType,
    },
    page: {
        type: postType,
    },
    attachment: {
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
