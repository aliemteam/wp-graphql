import {
    GraphQLEnumType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { Context, contextType, Order, orderType } from '../../lib/abstract-types/';
import { namespace as NS } from '../../lib/constants';
import { ArgumentField } from '../../lib/strongTypes';
import enumFactory from '../../lib/type-factories/enumFactory';
import { MediaMimeBase, mediaMimeBaseType } from './types/mediaKindType';
import mediaStatusType, { MediaStatus } from './types/mediaStatusType';
import mediaType, { Media } from './types/mediaType';

export type MediaOrderBy = 'date'|'id'|'include'|'relevance'|'slug'|'title';
export const mediaOrderByType: GraphQLEnumType = enumFactory('MediaOrderBy',
    ['date', 'id', 'include', 'relevance', 'slug', 'title'],
);

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
    filter?: string;
    /** Limit result set to specific ids. */
    include?: number|number[];
    /** Limit result set to attachments of a particular media type. */
    media_type?: MediaMimeBase;
    /** Limit result set to attachments of a particular MIME type. */
    mime_type?: string;
    /** Offset the result set by a specific number of items. */
    offset?: number;
    /** Order sort attribute ascending or descending. */
    order?: Order;
    /** Sort collection by object attribute. */
    orderby?: MediaOrderBy;
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
    status?: MediaStatus;
}

const mediaList: ArgumentField<MediaListArgs> = {
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
            description: 'Use WP Query arguments to modify the response. (Not supported very well by WordPress)',
            type: GraphQLString,
        },
        include: {
            description: 'Limit result set to specific ids.',
            type: new GraphQLList(GraphQLInt),
        },
        media_type: {
            description: 'Limit result set to attachments of a particular media type.',
            type: mediaMimeBaseType,
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
            type: mediaOrderByType,
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
            type: mediaStatusType,
        },
    },
    resolve: (root, args: MediaListArgs): PromiseLike<Media[]> => (
        root.get(`/${NS}/media`, args)
    ),
};

export interface MediaArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
    /** ID of the media item being fetched. */
    id: number;
    /** The password for the post if it is password protected. */
    password?: string;
}

const media: ArgumentField<MediaArgs> = {
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
    resolve: (root, { id, ...args }: MediaArgs): PromiseLike<Media> => (
        root.get(`/${NS}/media/${id}`, args)
    ),
};

export default {
    mediaList,
    media,
};
