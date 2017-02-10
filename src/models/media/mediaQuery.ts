import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import {
    Context,
    contextType,
    enumFactory,
    Order,
    orderType,
} from '../../lib/abstract-types/';
import { ArgumentField } from '../../lib/strongTypes';
import mediaType, { Media } from './types/mediaType';

export interface MediaListArgs {
    /** Limit response to resources published after a given ISO8601 compliant date. */
    after?: string;
    /** Limit result set to posts assigned to specific authors. */
    author?: number|number[];
    /** Ensure result set excludes posts assigned to specific authors. */
    author_exclude?: number|number[];
    /** Limit response to resources published before a given ISO8601 compliant date. */
    before?: string;
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
    /** Ensure result set excludes specific ids. */
    exclude?: number|number[];
    /** Use WP Query arguments to modify the response; private query vars require appropriate authorization. */
    filter?: string; // FIXME: what is this?
    /** Limit result set to specific ids. */
    include?: number|number[];
    /** Limit result set to attachments of a particular media type. */
    media_type?: 'application'|'audio'|'image'|'text'|'video';
    /** Limit result set to attachments of a particular MIME type. */
    mime_type?: string;
    /** Offset the result set by a specific number of items. */
    offset?: number;
    /** Order sort attribute ascending or descending. */
    order?: Order;
    /** Sort collection by object attribute. */
    orderby?: 'date'|'id'|'include'|'relevance'|'slug'|'title';
    /** Current page of the collection. */
    page?: number;
    /** Limit result set to those of particular parent ids. */
    parent?: number|number[];
    /** Limit result set to all items except those of a particular parent id. */
    parent_exclude?: number|number[];
    /** Maximum number of items to be returned in result set. */
    per_page?: number;
    /** Limit results to those matching a string. */
    search?: string;
    /** Limit result set to posts with a specific slug. */
    slug?: string;
    /** Limit result set to posts assigned a specific status. */
    status?: 'inherit'|'private'|'trash';
}

const mediaKindType = enumFactory('MediaKind', ['application', 'audio', 'image', 'text', 'video']);

const mediaList: ArgumentField<MediaListArgs, any, any> = {
    description: 'Fetch a list of media items.',
    type: new GraphQLList(mediaType),
    args: {
        after: {
            description: 'Limit response to resources published after a given ISO8601 compliant date.',
            type: GraphQLString,
        },
        author: {
            description: 'Limit result set to posts assigned to specific authors.',
            type: new GraphQLList(GraphQLInt),
        },
        author_exclude: {
            description: 'Ensure result set excludes posts assigned to specific authors.',
            type: new GraphQLList(GraphQLInt),
        },
        before: {
            description: 'Limit response to resources published before a given ISO8601 compliant date.',
            type: GraphQLString,
        },
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        exclude: {
            description: 'Ensure result set excludes specific ids.',
            type: new GraphQLList(GraphQLInt),
        },
        filter: {
            description: 'Use WP Query arguments to modify the response.',
            type: GraphQLString,
        },
        include: {
            description: 'Limit result set to specific ids.',
            type: new GraphQLList(GraphQLInt),
        },
        media_type: {
            description: 'Limit result set to attachments of a particular media type.',
            type: mediaKindType,
        },
        mime_type: {
            description: 'Limit result set to attachments of a particular MIME type.',
            type: GraphQLString,
        },
        offset: {
            description: 'Offset the result set by a specific number of items.',
            type: GraphQLInt,
        },
        order: {
            description: 'Order sort attribute ascending or descending.',
            type: orderType,
        },
        orderby: {
            description: 'Sort collection by object attribute.',
            type: enumFactory('MediaOrderBy', [
                'date',
                'id',
                'include',
                'relevance',
                'slug',
                'title',
            ]),
        },
        page: {
            description: 'Current page of the collection.',
            type: GraphQLInt,
        },
        parent: {
            description: 'Limit result set to those of particular parent ids.',
            type: new GraphQLList(GraphQLInt),
        },
        parent_exclude: {
            description: 'Limit result set to all items except those of a particular parent id.',
            type: new GraphQLList(GraphQLInt),
        },
        per_page: {
            description: 'Maximum number of items to be returned in result set.',
            type: GraphQLInt,
        },
        search: {
            description: 'Limit results to those matching a string.',
            type: GraphQLString,
        },
        slug: {
            description: 'Limit result set to posts with a specific slug.',
            type: GraphQLString,
        },
        status: {
            description: 'Limit result set to posts assigned a specific status.',
            type: enumFactory('MediaStatusType', [
                'inherit',
                'private',
                'trash',
            ]),
        },
    },
    resolve: (_root, args: MediaListArgs, context): PromiseLike<Media[]> => context.get('/media', args),
};

export interface MediaArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
    /** ID of the media item being fetched. */
    id: number;
    /** The password for the post if it is password protected. */
    password?: string;
}

const media: ArgumentField<MediaArgs, any, any> = {
    description: 'Retrieve a single media item by ID.',
    type: mediaType,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        id: {
            description: 'ID of the media item being fetched.',
            type: new GraphQLNonNull(GraphQLInt),
        },
        password: {
            description: 'The password for the post if it is password protected.',
            type: GraphQLString,
        },
    },
    resolve: (_root, { id, ...args }: MediaArgs, context): PromiseLike<Media> => context.get(`/media/${id}`, args),
};

export default {
    mediaList,
    media,
};
