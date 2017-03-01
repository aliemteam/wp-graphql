import {
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { Context, contextType } from '../../lib/abstract-types/';
import { namespace as NS } from '../../lib/constants';
import { ArgumentField } from '../../lib/strongTypes';
import { PostType, postType as typeOfPost, PostTypeList, postTypeList } from './types/postTypeType';

export interface PostTypesArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
}

export interface PostTypeArgs extends PostTypesArgs {
    /** Slug of the post type being requested. */
    slug: string;
}

const postTypes: ArgumentField<PostTypesArgs> = {
    description: 'Retrieve an object of post types.',
    type: postTypeList,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
    },
    resolve: (root, args: PostTypesArgs) => (
        root.get<PostTypeList>(`/${NS}/types`, args)
    ),
};

const postType: ArgumentField<PostTypeArgs> = {
    description: 'Retrieve a single post type.',
    type: typeOfPost,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        slug: {
            description: 'Slug of the post type being requested.',
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve: (root, { slug, ...args }: PostTypeArgs) => (
        root.get<PostType>(`/${NS}/types/${slug}`, args)
    ),
};

export default {
    postTypes,
    postType,
};
