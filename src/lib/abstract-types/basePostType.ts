import {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { Meta, TypedFields } from '../strongTypes';
import { ContentDescriptor, contentDescriptorType, RawOrRendered, rawOrRenderedType } from './contentDescriptorType';

export interface BasePost<TMeta = Meta> {
    /** The ID for the author of the object. */
    author: number;
    /** Whether or not comments are open on the object. */
    comment_status: 'open'|'closed';
    /** The content for the object. */
    content: ContentDescriptor;
    /** The date the object was published, in the site's timezone. */
    date: string;
    /** The date the object was published, as GMT. */
    date_gmt: string;
    /** The excerpt for the object. */
    excerpt: ContentDescriptor;
    /** The ID of the featured media for the object. */
    featured_media: number;
    /** The globally unique identifier for the object. */
    readonly guid: RawOrRendered;
    /** The shape of the meta. */
    meta: TMeta;
    /** Unique identifier for the object. */
    readonly id: number;
    /** URL to the object */
    readonly link: string;
    /** The date the object was last modified, in the site's timezone. */
    readonly modified: string;
    /** The date the object was last modified, as GMT. */
    readonly modified_gmt: string;
    /** Whether or not the object can be pinged. */
    ping_status: 'open'|'closed';
    /** An alphanumeric identifier for the object unique to its type. */
    slug: string;
    /** A named status for the object. */
    status: 'publish'|'future'|'draft'|'pending'|'private';
    /** The theme file to use to display the object. Currently unused */
    template: '';
    /** The title for the object. */
    title: RawOrRendered;
    /** Type of Post for the object. */
    readonly type: string;
};

export const basePost: TypedFields<BasePost> = {
    author: {
        description: 'The ID for the author of the object.',
        type: GraphQLInt,
    },
    comment_status: {
        description: 'Whether or not comments are open on the object.',
        type: GraphQLString,
    },
    content: {
        description: 'The content for the object.',
        type: contentDescriptorType,
    },
    date: {
        description: "The date the object was published, in the site's timezone.",
        type: GraphQLString,
    },
    date_gmt: {
        description: 'The date the object was published, as GMT.',
        type: GraphQLString,
    },
    excerpt: {
        description: 'The excerpt for the object.',
        type: contentDescriptorType,
    },
    featured_media: {
        description: 'The ID of the featured media for the object.',
        type: GraphQLInt,
    },
    guid: {
        description: 'The globally unique identifier for the object.',
        type: rawOrRenderedType,
    },
    id: {
        description: 'Unique identifier for the object.',
        type: new GraphQLNonNull(GraphQLInt),
    },
    link: {
        description: 'The URL to the object.',
        type: GraphQLString,
    },
    meta: {
        description: 'Meta fields.',
        type: GraphQLString,
        resolve: post => JSON.stringify(post.meta),
    },
    modified: {
        description: "The date the object was last modified, in the site's timezone.",
        type: GraphQLString,
    },
    modified_gmt: {
        description: 'The date the object was last modified, as GMT.',
        type: GraphQLString,
    },
    ping_status: {
        description: 'Whether or not the object can be pinged.',
        type: GraphQLString,
    },
    slug: {
        description: 'An alphanumeric identifier for the object unique to its type.',
        type: GraphQLString,
    },
    status: {
        description: 'A named status for the object.',
        type: GraphQLString,
    },
    template: {
        description: 'The theme file to use to display the object. Currently unused.',
        type: GraphQLString,
    },
    title: {
        description: 'The title for the object.',
        type: rawOrRenderedType,
    },
    type: {
        description: 'Type of Post for the object.',
        type: GraphQLString,
    },
};
