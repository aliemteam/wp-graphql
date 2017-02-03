import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLObjectTypeConfig,
    GraphQLString,
} from 'graphql';

import { ContentDescriptor, contentDescriptorType } from '../shared/';

export interface BasePostObject {
    /** Unique identifier for the object. */
    readonly id: number;
    /** The date the object was published, in the site's timezone. */
    date: string;
    /** The date the object was published, as GMT. */
    date_gmt: string;
    /** URL to the object */
    readonly link: string;
    /** The date the object was last modified, in the site's timezone. */
    readonly modified: string;
    /** The date the object was last modified, as GMT. */
    readonly modified_gmt: string;
    /** An alphanumeric identifier for the object unique to its type. */
    slug: string;
    /** A named status for the object. */
    status: 'publish'|'future'|'draft'|'pending'|'private';
    /** Type of Post for the object. */
    readonly type: 'post';
    /** A password to protect access to the content and excerpt. */
    password: 'string';
    /** The content for the object. */
    content: ContentDescriptor;
    /** The ID for the author of the object. */
    author: number;
    /** The excerpt for the object. */
    excerpt: ContentDescriptor;
    /** The ID of the featured media for the object. */
    featured_media: number;
    /** Whether or not comments are open on the object. */
    comment_status: 'open'|'closed';
    /** Whether or not the object can be pinged. */
    ping_status: 'open'|'closed';
    /** The format for the object. */
    format: 'standard'|'status';
    /** Whether or not the object should be treated as sticky. */
    sticky: boolean;
    /** The theme file to use to display the object. Currently unused */
    template: '';
    /** TODO: Not sure what this is.. */
    meta: any[];
    /** The terms assigned to the object in the category taxonomy. */
    categories: number[];
    /** The terms assigned to the object in the post_tag taxonomy. TODO: not sure what shape this is */
    tags: any[];
    /** The number of Liveblog Likes the post has. */
    liveblog_likes: number;
    // links: {}; TODO:
};

interface RawPost extends BasePostObject {
    guid: {
        readonly rendered: string;
    };
    title: {
        rendered: string;
    };
}

export interface Post extends BasePostObject {
    /** The globally unique identifier for the object. */
    readonly guid: string;
    /** The title for the object. */
    title: string;
}

type postTypeConfig = GraphQLObjectTypeConfig<RawPost, {}>;

export const postType = new GraphQLObjectType(<postTypeConfig>{
    name: 'Post',
    description: 'WordPress Post.',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'Unique identifier for the object.',
        },
        date: {
            type: GraphQLString,
            description: "The date the object was published, in the site's timezone.",
        },
        date_gmt: {
            type: GraphQLString,
            description: 'The date the object was published, as GMT.',
        },
        guid: {
            type: GraphQLString,
            description: 'The globally unique identifier for the object.',
            resolve: post => post.guid.rendered,
        },
        modified: {
            type: GraphQLString,
            description: '',
        },
        modified_gmt: {
            type: GraphQLString,
            description: '',
        },
        slug: {
            type: GraphQLString,
            description: '',
        },
        type: {
            type: GraphQLString,
            description: '',
        },
        link: {
            type: GraphQLString,
            description: '',
        },
        title: {
            type: GraphQLString,
            description: '',
            resolve: post => post.title.rendered,
        },
        content: {
            type: contentDescriptorType,
        },
        excerpt: {
            type: contentDescriptorType,
        },
        author: {
            type: GraphQLInt,
            description: 'ID of the Author',
        },
        featured_media: {
            type: GraphQLInt,
        },
        comment_status: {
            type: GraphQLString,
        },
        ping_status: {
            type: GraphQLString,
        },
        sticky: {
            type: GraphQLBoolean,
        },
        template: {
            type: GraphQLString,
        },
        format: {
            type: GraphQLString,
        },
        meta: {
            type: new GraphQLList(GraphQLString),
        },
        categories: {
            type: new GraphQLList(GraphQLInt),
        },
        tags: {
            type: new GraphQLList(GraphQLInt),
        },
        liveblog_likes: {
            type: GraphQLInt,
        },
    }),
});
