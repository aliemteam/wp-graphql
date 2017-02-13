import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { ContentDescriptor, contentDescriptorType } from '../../../lib/abstract-types';
import metaType, { Meta, RawMeta } from '../../../lib/abstract-types/metaType';
import metaParser from '../../../lib/helpers/metaParser';
import { TypedFields } from '../../../lib/strongTypes';
import { avatarObjectType, UserAvatarUrls } from '../../users/types/userType';
import commentKind, { CommentKind } from './commentKindType';

export interface MutableCommentOptions {
    /** The id of the user object, if author was a user. */
    author: number;
    /** Email address for the object author. */
    author_email: string;
    /** IP address for the object author (IPv6). */
    author_ip: string;
    /** Display name for the object author. */
    author_name: string;
    /** URL for the object author. */
    author_url: string;
    /** The content for the object. */
    content: ContentDescriptor|string;
    /** The date the object was published. */
    date: string;
    /** The date the object was published as GMT. */
    date_gmt: string;
    /** Karma for the object. */
    karma: number;
    /** The id for the parent of the object. */
    parent: number;
    /** The id of the associated post object. */
    post: number;
    /** State of the object. */
    status: string;
    /** Type of Comment for the object. */
    type: CommentKind;
}

export interface RawComment extends MutableCommentOptions {
    /** Avatar URLs for the object author. */
    readonly author_avatar_urls: UserAvatarUrls;
    /** User agent for the object author. */
    readonly author_user_agent: string;
    /** Unique identifier for the object. */
    readonly id: number;
    /** URL to the object. */
    readonly link: string;
    /** The content for the object. */
    content: ContentDescriptor;
    /** Meta fields. */
    meta: RawMeta;
}

export interface Comment extends MutableCommentOptions {
    /** Avatar URLs for the object author. */
    readonly author_avatar_urls: UserAvatarUrls;
    /** User agent for the object author. */
    readonly author_user_agent: string;
    /** Unique identifier for the object. */
    readonly id: number;
    /** URL to the object. */
    readonly link: string;
    /** The content for the object. */
    content: ContentDescriptor;
    /** Meta fields. */
    meta: Meta;
}

const commentFields: TypedFields<Comment, RawComment, {}> = {
    author: {
        description: 'The id of the user object, if author was a user.',
        type: GraphQLInt,
    },
    author_avatar_urls: {
        description: 'Avatar URLs for the object author.',
        type: avatarObjectType,
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
    author_user_agent: {
        description: 'User agent for the object author.',
        type: GraphQLString,
    },
    content: {
        description: 'The content for the object.',
        type: contentDescriptorType,
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
        description: 'Unique identifier for the object.',
        type: new GraphQLNonNull(GraphQLInt),
    },
    karma: {
        description: 'Karma for the object.',
        type: GraphQLInt,
    },
    link: {
        description: 'URL to the object.',
        type: GraphQLString,
    },
    meta: {
        description: 'Meta fields.',
        type: new GraphQLList(metaType),
        resolve: metaParser,
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
        type: GraphQLString,
    },
    type: {
        description: 'Type of Comment for the object.',
        type: commentKind,
    },
};

export default new GraphQLObjectType({
    name: 'Comment',
    description: 'A single comment object',
    fields: () => ({
        ...commentFields,
    }),
});
