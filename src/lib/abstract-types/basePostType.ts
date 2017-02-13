import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import metaParser from '../helpers/metaParser';
import { TypedFields } from '../strongTypes';
import { ContentDescriptor, contentDescriptorType } from './contentDescriptorType';
import metaType, { Meta, RawMeta } from './metaType';

export interface SharedFields {
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
    /** Type of Post for the object. */
    readonly type: 'post'|'page';
    // links: {}; TODO:
};

export interface RawBasePost extends SharedFields {
    guid: {
        readonly rendered: string;
    };
    meta: RawMeta;
    title: {
        rendered: string;
    };
}

export interface BasePost extends SharedFields {
    /** The globally unique identifier for the object. */
    readonly guid: string;
    meta: Meta;
    /** The title for the object. */
    title: string;
}

export const basePost: TypedFields<RawBasePost, RawBasePost, {}> = {
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
        type: GraphQLString,
        resolve: post => post.guid.rendered,
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
        type: new GraphQLList(metaType),
        resolve: metaParser,
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
        type: GraphQLString,
        resolve: post => post.title.rendered,
    },
    type: {
        description: 'Type of Post for the object.',
        type: GraphQLString,
    },
};
