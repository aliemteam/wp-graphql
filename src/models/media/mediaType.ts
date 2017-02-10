import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { ContentDescriptor, contentDescriptorType } from '../../lib/abstract-types/';
import { TypedFields } from '../../lib/strongTypes';
import { Status } from '../post-statuses/postStatusType';

export interface MediaSizeDetails {
    /** File name including extension. */
    file: string;
    /** The height of the file. */
    height: number;
    /** The mime_type for the file. */
    mime_type: string;
    /** The name of the size. (eg. "thumbnail") */
    slug: string;
    /** The full URL for the file. */
    source_url: string;
    /** The width of the file. */
    width: number;
}

const mediaSizeFields: TypedFields<MediaSizeDetails, MediaSizeDetails, any> = {
    file: {
        description: 'File name including extension.',
        type: GraphQLString,
    },
    height: {
        description: 'The height of the file.',
        type: GraphQLInt,
    },
    mime_type: {
        description: 'The mime_type for the file.',
        type: GraphQLString,
    },
    slug: {
        description: 'The name of the size. (eg. "thumbnail")',
        type: GraphQLString,
    },
    source_url: {
        description: 'The full URL for the file.',
        type: GraphQLString,
    },
    width: {
        description: 'The width of the file.',
        type: GraphQLInt,
    },
};

export const mediaSizeType = new GraphQLObjectType({
    name: 'MediaSize',
    description: 'Details about a single media item at a specific size.',
    fields: () => ({
        ...mediaSizeFields,
    }),
});

export interface ImageMeta {
    /** Image aperture. */
    aperture: string;
    /** Details about the camera used to take the photo. */
    camera: string;
    /** Image caption. */
    caption: string;
    /** Copyright details. */
    copyright: string;
    /** ISO8601 timestamp. */
    created_timestamp: string;
    /** Image credit. */
    credit: string;
    /** Image focal length. */
    focal_length: string;
    /** Image iso details. */
    iso: string;
    /** List of keywords */
    keywords: string[];
    /** Image orientation. */
    orientation: string;
    /** Image shutter speed. */
    shutter_speed: string;
    /** Image title. */
    title: string;
}
const imageMetaFields: TypedFields<ImageMeta, ImageMeta, {}> = {
    aperture: {
        description: 'Image aperture.',
        type: GraphQLString,
    },
    camera: {
        description: 'Details about the camera used to take the photo.',
        type: GraphQLString,
    },
    caption: {
        description: 'Image caption.',
        type: GraphQLString,
    },
    copyright: {
        description: 'Copyright details.',
        type: GraphQLString,
    },
    created_timestamp: {
        description: 'ISO8601 timestamp.',
        type: GraphQLString,
    },
    credit: {
        description: 'Image credit.',
        type: GraphQLString,
    },
    focal_length: {
        description: 'Image focal length.',
        type: GraphQLString,
    },
    iso: {
        description: 'Image iso details.',
        type: GraphQLString,
    },
    keywords: {
        description: 'List of keywords.',
        type: new GraphQLList(GraphQLString),
    },
    orientation: {
        description: 'Image orientation.',
        type: GraphQLString,
    },
    shutter_speed: {
        description: 'Image shutter speed.',
        type: GraphQLString,
    },
    title: {
        description: 'Image title.',
        type: GraphQLString,
    },
};
export const imageMetaType = new GraphQLObjectType({
    name: 'ImageMeta',
    description: 'Metadata for photographs.',
    fields: () => ({
        ...imageMetaFields,
    }),
});

export interface MediaDetailsBase {
    /** The file path relative to `wp-content/uploads/` */
    file: string;
    /** The height of the attachment */
    height: number;
    /** Metadata about the image (if media type is image) */
    image_meta: ImageMeta;
    /** The width of the attachment */
    width: number;
}

export interface MediaDetailsRaw extends MediaDetailsBase {
    /** Keys are size slugs, values are MediaSizeDetails */
    sizes: {
        thumbnail: MediaSizeDetails;
        medium?: MediaSizeDetails;
        large?: MediaSizeDetails;
        full: MediaSizeDetails;
        [customSize: string]: MediaSizeDetails|undefined;
    };
}

export interface MediaDetails extends MediaDetailsBase {
    /** Array of MediaSizeDetails */
    sizes: MediaSizeDetails[];
}

const mediaDetailsFields: TypedFields<MediaDetails, MediaDetailsRaw, {}> = {
    file: {
        description: '',
        type: GraphQLString,
    },
    height: {
        description: '',
        type: GraphQLInt,
    },
    image_meta: {
        description: '',
        type: imageMetaType,
    },
    sizes: {
        description: '',
        type: new GraphQLList(mediaSizeType),
        resolve: details => (
            Object.keys(details.sizes).map(slug => ({
                ...details.sizes[slug], slug,
            }))
        ),
    },
    width: {
        description: '',
        type: GraphQLInt,
    },
};
const mediaDetailsType = new GraphQLObjectType({
    name: 'MediaDetails',
    description: 'Details about the resource file, specific to its type.',
    fields: () => ({
        ...mediaDetailsFields,
    }),
});

export interface MediaBase {
    /** Alternative text to display when resource is not displayed. */
    alt_text: string;
    /** The id for the author of the object. */
    author: number;
    /** The caption for the resource. */
    caption: ContentDescriptor;
    /** Whether or not comments are open on the object. */
    comment_status: 'open'|'closed';
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
    media_type: 'image'|'file';
    /** Meta fields. */
    meta: any[]; // FIXME:
    /** MIME type of resource. */
    mime_type: string;
    /** The date the object was last modified, in the site’s timezone. */
    modified: string;
    /** The date the object was last modified, as GMT. */
    modified_gmt: string;
    /** Whether or not the object can be pinged. */
    ping_status: 'open'|'closed';
    /** The id for the associated post of the resource. */
    post: number;
    /** An alphanumeric identifier for the object unique to its type. */
    slug: string;
    /** URL to the original resource file. */
    source_url: string;
    /** A named status for the object. */
    status: Status;
    /** The title for the object. */
    title: ContentDescriptor;
    /** Type of Post for the object. */
    type: string;
}

export interface MediaRaw extends MediaBase {
    /** Details about the resource file, specific to its type. */
    media_details: MediaDetailsRaw;
}

export interface Media extends MediaBase {
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
        type: GraphQLString,
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
        description: 'Type of resource. ("image" or "file")',
        type: GraphQLString,
    },
    meta: {
        description: 'Meta fields.',
        type: new GraphQLList(GraphQLString),
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
        type: GraphQLString,
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
        type: GraphQLString,
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
