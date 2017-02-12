import {
    GraphQLBoolean,
    GraphQLEnumType,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { TypedFields } from '../../../lib/strongTypes';

export type Status = 'draft'|'future'|'pending'|'private'|'publish'|'trash';
export type PostStatus = Status|Status[];

export const postStatusType = new GraphQLEnumType({
    name: 'PostStatusArg',
    description: 'Publication status of the post.',
    values: {
        draft: { value: 'draft' },
        future: { value: 'future' },
        pending: { value: 'pending' },
        private: { value: 'private' },
        publish: { value: 'publish' },
        trash: { value: 'trash' },
    },
});

export interface SinglePostStatus {
    /** The title for the resource. */
    readonly name: string;
    /** Whether posts with this resource should be private. */
    readonly private: boolean;
    /** Whether posts with this resource should be protected. */
    readonly protected: boolean;
    /** Whether posts of this resource should be shown in the front end of the site. */
    readonly public: boolean;
    /** Whether posts with this resource should be publicly-queryable. */
    readonly queryable: boolean;
    /** Whether to include posts in the edit listing for their post type. */
    readonly show_in_list: boolean;
    /** An alphanumeric identifier for the resource. */
    readonly slug: string;
}

const singleStatusFields: TypedFields<SinglePostStatus, SinglePostStatus, {}> = {
    name: {
        description: 'The title for the resource.',
        type: GraphQLString,
    },
    private: {
        description: 'Whether posts with this resource should be private.',
        type: GraphQLBoolean,
    },
    protected: {
        description: 'Whether posts with this resource should be protected.',
        type: GraphQLBoolean,
    },
    public: {
        description: 'Whether posts of this resource should be shown in the front end of the site.',
        type: GraphQLBoolean,
    },
    queryable: {
        description: 'Whether posts with this resource should be publicly-queryable.',
        type: GraphQLBoolean,
    },
    show_in_list: {
        description: 'Whether to include posts in the edit listing for their post type.',
        type: GraphQLBoolean,
    },
    slug: {
        description: 'An alphanumeric identifier for the resource.',
        type: GraphQLString,
    },
};

export const singlePostStatusType = new GraphQLObjectType({
    name: 'PostStatus',
    description: 'Object representing a single post status type.',
    fields: () => ({
        ...singleStatusFields,
    }),
});

export type PostStatusObject = { [k in Status]: SinglePostStatus };
const postStatusFields: TypedFields<PostStatusObject, PostStatusObject, {}> = {
    draft: {
        description: 'PostStatus for type "draft"',
        type: singlePostStatusType,
    },
    future: {
        description: 'PostStatus for type "future"',
        type: singlePostStatusType,
    },
    pending: {
        description: 'PostStatus for type "pending"',
        type: singlePostStatusType,
    },
    private: {
        description: 'PostStatus for type "private"',
        type: singlePostStatusType,
    },
    publish: {
        description: 'PostStatus for type "publish"',
        type: singlePostStatusType,
    },
    trash: {
        description: 'PostStatus for type "trash"',
        type: singlePostStatusType,
    },
};

export const postStatusObjectType = new GraphQLObjectType({
    name: 'PostStatusObject',
    description: 'Object containing all post status types.',
    fields: () => ({
        ...postStatusFields,
    }),
});
