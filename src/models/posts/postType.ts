import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLObjectTypeConfig,
    GraphQLString,
} from 'graphql';
import { basePost, BasePost, RawBasePost } from '../../lib/abstract-types/';
import { TypedFields } from '../../lib/strongTypes';

export interface UniquePostFields {
    /** The terms assigned to the object in the category taxonomy. */
    categories: number[];
    /** The format for the object. */
    format: 'standard'|'status';
    /** The number of Liveblog Likes the post has. */
    liveblog_likes: number;
    /** A password to protect access to the content and excerpt. */
    password: 'string';
    /** Whether or not the object should be treated as sticky. */
    sticky: boolean;
    /** The terms assigned to the object in the post_tag taxonomy. TODO: not sure what shape this is */
    tags: any[];
}

export interface Post extends BasePost, UniquePostFields {
    /** String literal. Will always be "post" for posts. */
    readonly type: 'post';
}

type config = GraphQLObjectTypeConfig<(UniquePostFields & RawBasePost), {}>;
type fields = TypedFields<UniquePostFields, (UniquePostFields & RawBasePost), {}>;

const postFields: fields = {
    categories: {
        type: new GraphQLList(GraphQLInt),
        description: 'The terms assigned to the object in the category taxonomy.',
    },
    format: {
        type: GraphQLString,
        description: 'The format for the object.',
    },
    liveblog_likes: {
        type: GraphQLInt,
        description: 'The number of Liveblog Likes the post has.',
    },
    password: {
        type: GraphQLString,
        description: 'A password to protect access to the content and excerpt.',
    },
    sticky: {
        type: GraphQLBoolean,
        description: 'Whether or not the object should be treated as sticky.',
    },
    tags: {
        type: new GraphQLList(GraphQLInt),
        description: 'The terms assigned to the object in the post_tag taxonomy.',
    },
};

export const postType = new GraphQLObjectType(<config>{
    name: 'Post',
    description: 'A WordPress Post Object.',
    fields: () => ({
        ...basePost,
        ...postFields,
    }),
});
