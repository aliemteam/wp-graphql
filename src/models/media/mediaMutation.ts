import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { openClosedType, OpenOrClosed } from '../../lib/abstract-types/';
import { namespace as NS } from '../../lib/constants';
import { ArgumentField } from '../../lib/strongTypes';
import deletedObjectFactory, { DeletedUnion } from '../../lib/type-factories/deletedObjectFactory';
import mediaStatusType, { MediaStatus } from './types/mediaStatusType';
import mediaType, { Media } from './types/mediaType';

export const deletedMediaType: GraphQLObjectType = deletedObjectFactory(mediaType);

export interface MediaMutationOptions {
    /** Alternative text to display when resource is not displayed. */
    alt_text?: string;
    /** The id for the author of the object. */
    author?: number;
    /** The caption for the resource. */
    caption?: string;
    /** Whether or not comments are open on the object. */
    comment_status?: OpenOrClosed;
    /** The date the object was published, in the site’s timezone. */
    date?: string;
    /** The date the object was published, as GMT. */
    date_gmt?: string;
    /** The description for the resource. */
    description?: string;
    /** JSON stringified meta fields. */
    meta?: string;
    /** Whether or not the object can be pinged. */
    ping_status?: OpenOrClosed;
    /** The id for the associated post of the resource. */
    post?: number;
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: string;
    /** A named status for the object. */
    status?: MediaStatus;
    /** The title for the object. */
    title?: string;
}

export interface AddMediaArgs extends MediaMutationOptions {
    /** The file to be uploaded. */
    file: ArrayBuffer|Blob|File;
    /** The name of the file, including the file extension. */
    filename: string;
}

const addMedia: ArgumentField<AddMediaArgs> = {
    description: 'Upload media using an Array Buffer, File, or Blob.',
    type: mediaType,
    args: {
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
            type: GraphQLString,
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
            type: GraphQLInt,
        },
        file: {
            description: 'The file to be uploaded.',
            type: new GraphQLNonNull(GraphQLString),
        },
        filename: {
            description: 'The name of the file, including the file extension.',
            type: new GraphQLNonNull(GraphQLString),
        },
        meta: {
            description: 'Meta fields.',
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
        status: {
            description: 'A named status for the object.',
            type: mediaStatusType,
        },
        title: {
            description: 'The title for the object.',
            type: GraphQLString,
        },
    },
    resolve: (root, args: AddMediaArgs) => (
        root.upload<Media>(`/${NS}/media`, args)
    ),
};

export interface UpdateMediaArgs extends MediaMutationOptions {
    /** The ID of the media file. */
    id: number;
}

const updateMedia: ArgumentField<UpdateMediaArgs> = {
    description: 'Update media by ID.',
    type: mediaType,
    args: {
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
            type: GraphQLString,
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
            type: GraphQLInt,
        },
        id: {
            description: 'The ID of the media file.',
            type: new GraphQLNonNull(GraphQLInt),
        },
        meta: {
            description: 'JSON stringified meta fields.',
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
        status: {
            description: 'A named status for the object.',
            type: mediaStatusType,
        },
        title: {
            description: 'The title for the object.',
            type: GraphQLString,
        },
    },
    resolve: (root, { id, ...args }: UpdateMediaArgs) => (
        root.post<Media>(`/${NS}/media/${id}`, args)
    ),
};

export interface DeleteMediaArgs {
    /** The ID of the media being deleted. */
    id: number;
    /** Set internally. Must be true for request to complete. */
    force: true;
}

const deleteMedia: ArgumentField<DeleteMediaArgs> = {
    description: 'Delete media by ID.',
    type: deletedMediaType,
    args: {
        force: {
            description: 'Set internally. Must be true for request to complete.',
            type: GraphQLBoolean,
            defaultValue: true,
        },
        id: {
            description: 'The ID of the media being deleted.',
            type: new GraphQLNonNull(GraphQLInt),
        },
    },
    resolve: (root, { id, ...args }: DeleteMediaArgs) => (
        root.delete<DeletedUnion<Media>>(`${NS}/media/${id}`, args)
    ),
};

export default {
    addMedia,
    updateMedia,
    deleteMedia,
};
