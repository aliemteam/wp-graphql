import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { ContentDescriptor, contentDescriptorType } from './contentDescriptorType';
import { TypedFields } from './strongTypes';

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
    /** TODO: Not sure what this is.. */
    meta: any[];
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

export interface RawBasePostObject extends SharedFields {
    guid: {
        readonly rendered: string;
    };
    title: {
        rendered: string;
    };
}

export interface BasePostObject extends SharedFields {
    /** The globally unique identifier for the object. */
    readonly guid: string;
    /** The title for the object. */
    title: string;
}

export const basePostObject: TypedFields<RawBasePostObject, RawBasePostObject, {}> = {
    author: {
        type: GraphQLInt,
        description: 'The ID for the author of the object.',
    },
    comment_status: {
        type: GraphQLString,
        description: 'Whether or not comments are open on the object.',
    },
    content: {
        type: contentDescriptorType,
        description: 'The content for the object.',
    },
    date: {
        type: GraphQLString,
        description: "The date the object was published, in the site's timezone.",
    },
    date_gmt: {
        type: GraphQLString,
        description: 'The date the object was published, as GMT.',
    },
    excerpt: {
        type: contentDescriptorType,
        description: 'The excerpt for the object.',
    },
    featured_media: {
        type: GraphQLInt,
        description: 'The ID of the featured media for the object.',
    },
    guid: {
        type: GraphQLString,
        description: 'The globally unique identifier for the object.',
        resolve: post => post.guid.rendered,
    },
    id: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'Unique identifier for the object.',
    },
    link: {
        type: GraphQLString,
        description: 'The URL to the object.',
    },
    meta: {
        type: new GraphQLList(GraphQLString), // FIXME: Not sure what shape this is
        description: 'Meta fields.',
    },
    modified: {
        type: GraphQLString,
        description: "The date the object was last modified, in the site's timezone.",
    },
    modified_gmt: {
        type: GraphQLString,
        description: 'The date the object was last modified, as GMT.',
    },
    ping_status: {
        type: GraphQLString,
        description: 'Whether or not the object can be pinged.',
    },
    slug: {
        type: GraphQLString,
        description: 'An alphanumeric identifier for the object unique to its type.',
    },
    status: {
        type: GraphQLString,
        description: 'A named status for the object.',
    },
    template: {
        type: GraphQLString,
        description: 'The theme file to use to display the object. Currently unused.',
    },
    title: {
        type: GraphQLString,
        description: 'The title for the object.',
        resolve: post => post.title.rendered,
    },
    type: {
        type: GraphQLString,
        description: 'Type of Post for the object.',
    },
};
