import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { contextType } from '../../lib/abstract-types';
import { StrongTypedFieldConfig } from '../../lib/strongTypes';
import tagType, { Tag } from './tagType';

export interface TagsArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context: 'view'|'embed'|'edit';
    /** Ensure result set excludes specific IDs. */
    exclude: string;
    /** Whether to hide terms not assigned to any posts. */
    hide_empty: boolean;
    /** Limit result set to specific IDs. */
    include: string;
    /** Offset the result set by a specific number of items. */
    offset: number;
    /** Order sort attribute ascending or descending. */
    order: 'asc'|'desc';
    /** Sort collection by term attribute. */
    orderby: 'id'|'include'|'name'|'slug'|'term_group'|'description'|'count';
    /** Current page of the collection. */
    page: number;
    /** Maximum number of items to be returned in result set. */
    per_page: number;
    /** Limit result set to terms assigned to a specific post. */
    post: number;
    /** Limit results to those matching a string. */
    search: string;
    /** Limit result set to terms with a specific slug. */
    slug: string;
}

const tags: StrongTypedFieldConfig<TagsArgs, any, any> = {
    description: 'Fetch a list of tags.',
    type: new GraphQLList(tagType),
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        exclude: {
            description: 'Ensure result set excludes specific IDs.',
            type: GraphQLString,
        },
        hide_empty: {
            description: 'Whether to hide terms not assigned to any posts.',
            type: GraphQLBoolean,
        },
        include: {
            description: 'Limit result set to specific IDs.',
            type: GraphQLString,
        },
        offset: {
            description: 'Offset the result set by a specific number of items.',
            type: GraphQLInt,
        },
        order: {
            description: 'Order sort attribute ascending or descending.',
            type: GraphQLString, // TODO: This should be typed
        },
        orderby: {
            description: 'Sort collection by term attribute.',
            type: GraphQLString,
        },
        page: {
            description: 'Current page of the collection.',
            type: GraphQLInt,
        },
        per_page: {
            description: 'Maximum number of items to be returned in result set.',
            type: GraphQLInt,
        },
        post: {
            description: 'Limit result set to terms assigned to a specific post.',
            type: GraphQLInt,
        },
        search: {
            description: 'Limit results to those matching a string.',
            type: GraphQLString,
        },
        slug: {
            description: 'Limit result set to terms with a specific slug.',
            type: GraphQLString,
        },
    },
    resolve: (_root, args: TagsArgs, context): Tag[] => context.get('/tags', args),
};

export interface TagArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context: 'view'|'embed'|'edit';
    /** ID of the tag of interest. */
    id: number;
}

const tag: StrongTypedFieldConfig<TagArgs, any, any> = {
    description: 'Fetch a single tag.',
    type: tagType,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        id: {
            description: 'ID of the tag of interest.',
            type: new GraphQLNonNull(GraphQLInt),
        },
    },
    resolve: (_root, { id, ...args }: TagArgs, context): Tag => context.get(`/tags/${id}`, args),
};

export default {
    tags,
    tag,
};
