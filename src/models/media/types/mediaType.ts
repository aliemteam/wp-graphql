import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { ContentDescriptor, contentDescriptorType, openClosedType, OpenOrClosed } from '../../../lib/abstract-types/';
import { TypedFields } from '../../../lib/strongTypes';
import mediaDetailsType, { MediaDetails, MediaDetailsRaw } from './mediaDetailsType';
import mediaKindType, { MediaKind } from './mediaKindType';
import mediaStatusType, { MediaStatus } from './mediaStatusType';

export interface MediaBase<TMeta> {
    /** Alternative text to display when resource is not displayed. */
    alt_text: string;
    /** The id for the author of the object. */
    author: number;
    /** The caption for the resource. */
    caption: ContentDescriptor;
    /** Whether or not comments are open on the object. */
    comment_status: OpenOrClosed;
    /** The date the object was published, in the site’s timezone. */
    date: string;
    /** The date the object was published, as GMT. */
    date_gmt: string;
    /** The description for the resource. */
    description: ContentDescriptor;
    /** The globally unique identifier for the object. */
    guid: ContentDescriptor;
    /** Unique identifier for the object. */
    id: number;
    /** URL to the object. */
    link: string;
    /** Type of resource. */
    media_type: MediaKind;
    /** The expected shape of the meta fields. */
    meta: TMeta;
    /** MIME type of resource. */
    mime_type: string;
    /** The date the object was last modified, in the site’s timezone. */
    modified: string;
    /** The date the object was last modified, as GMT. */
    modified_gmt: string;
    /** Whether or not the object can be pinged. */
    ping_status: OpenOrClosed;
    /** The id for the associated post of the resource. */
    post: number;
    /** An alphanumeric identifier for the object unique to its type. */
    slug: string;
    /** URL to the original resource file. */
    source_url: string;
    /** A named status for the object. */
    status: MediaStatus;
    /** The title for the object. */
    title: ContentDescriptor;
    /** Type of Post for the object. */
    type: string;
}

export interface MediaRaw extends MediaBase<object> {
    /** Details about the resource file, specific to its type. */
    media_details: MediaDetailsRaw;
}

export interface Media<TMeta = { [k: string]: any }> extends MediaBase<TMeta> {
    /** Details about the resource file, specific to its type. */
    media_details: MediaDetails;
}

const mediaFields: TypedFields<MediaRaw, Media, {}> = {
    alt_text: {
        description: 'Alternative text to display when resource is not displayed.',
        type: GraphQLString,
    },
    author: {
        description: 'The id for the author of the object.',
        type: GraphQLInt,
    },
    caption: {
        description: 'The caption for the resource.',
        type: contentDescriptorType,
    },
    comment_status: {
        description: 'Whether or not comments are open on the object.',
        type: openClosedType,
    },
    date: {
        description: 'The date the object was published, in the site’s timezone.',
        type: GraphQLString,
    },
    date_gmt: {
        description: 'The date the object was published, as GMT.',
        type: GraphQLString,
    },
    description: {
        description: 'The description for the resource.',
        type: contentDescriptorType,
    },
    guid: {
        description: 'The globally unique identifier for the object.',
        type: contentDescriptorType,
    },
    id: {
        description: 'Unique identifier for the object.',
        type: GraphQLInt,
    },
    link: {
        description: 'URL to the object.',
        type: GraphQLString,
    },
    media_details: {
        description: 'Array of MediaSizeDetails',
        type: mediaDetailsType,
    },
    media_type: {
        description: 'Type of resource. (image or file)',
        type: mediaKindType,
    },
    meta: {
        description: 'JSON stringified meta fields.',
        type: GraphQLString,
        resolve: media => JSON.stringify(media.meta),
    },
    mime_type: {
        description: 'MIME type of resource.',
        type: GraphQLString,
    },
    modified: {
        description: 'The date the object was last modified, in the site’s timezone.',
        type: GraphQLString,
    },
    modified_gmt: {
        description: 'The date the object was last modified, as GMT.',
        type: GraphQLString,
    },
    ping_status: {
        description: 'Whether or not the object can be pinged.',
        type: openClosedType,
    },
    post: {
        description: 'The id for the associated post of the resource.',
        type: GraphQLInt,
    },
    slug: {
        description: 'An alphanumeric identifier for the object unique to its type.',
        type: GraphQLString,
    },
    source_url: {
        description: 'URL to the original resource file.',
        type: GraphQLString,
    },
    status: {
        description: 'A named status for the object.',
        type: mediaStatusType,
    },
    title: {
        description: 'The title for the object.',
        type: contentDescriptorType,
    },
    type: {
        description: 'Type of Post for the object.',
        type: GraphQLString,
    },
};

export default new GraphQLObjectType({
    name: 'Media',
    description: 'An object representing a singular media item.',
    fields: () => ({
        ...mediaFields,
    }),
});
