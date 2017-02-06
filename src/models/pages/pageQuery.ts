import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { contextType } from '../../lib/abstract-types/';
import { StrongTypedFieldConfig } from '../../lib/strongTypes';
import { Page, pageType } from './pageType';

export interface PagesArgs {
    /** Limit response to resources published after a given ISO8601 compliant date. */
    after?: string;
    /** Limit result set to posts assigned to specific authors. */
    author?: number;
    /** Ensure result set excludes posts assigned to specific authors. */
    author_exclude?: number;
    /** Limit response to resources published before a given ISO8601 compliant date. */
    before?: string;
    /** Scope under which the request is made; determines fields present in response. */
    context?: 'view'|'embed'|'edit';
    /** Ensure result set excludes specific ids. */
    exclude?: string;
    /** Use WP Query arguments to modify the response; private query vars require appropriate authorization. */
    filter?: string; // TODO: Not sure how this works
    /** Limit result set to specific ids. */
    include?: string;
    /** Limit result set to resources with a specific menu_order value. */
    menu_order?: number;
    /** Offset the result set by a specific number of items. */
    offset?: number;
    /** Order sort attribute ascending or descending. */
    order?: 'asc'|'desc';
    /** Sort collection by object attribute. */
    orderby?: 'date'|'relevance'|'id'|'include'|'title'|'slug'|'menu_order';
    /** Current page of the collection. */
    page?: number;
    /** Limit result set to those of particular parent ids. */
    parent?: number;
    /** Limit result set to all items except those of a particular parent id. */
    parent_exclude?: number;
    /** Maximum number of items to be returned in result set. */
    per_page?: number;
    /** Limit results to those matching a string. */
    search?: string;
    /** Limit result set to posts with a specific slug. */
    slug?: string;
    /** Limit result set to posts assigned a specific status. */
    status?: ('publish'|'future'|'draft'|'pending'|'private') | Array<'publish'|'future'|'draft'|'pending'|'private'>;
}

const pages: StrongTypedFieldConfig<PagesArgs, any, any> = {
    description: 'Retrieve a list of posts.',
    type: new GraphQLList(pageType),
    args: {
        after: {
            description: 'Limit response to resources published after a given ISO8601 compliant date.',
            type: GraphQLString,
        },
        author: {
            description: 'Limit result set to posts assigned to specific authors.',
            type: GraphQLInt,
        },
        author_exclude: {
            description: 'Ensure result set excludes posts assigned to specific authors.',
            type: GraphQLInt,
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
            type: GraphQLString,
        },
        filter: {
            description: 'Use WP Query arguments to modify the response.',
            type: GraphQLString,
        },
        include: {
            description: 'Limit result set to specific ids.',
            type: GraphQLString,
        },
        menu_order: {
            description: 'Limit result set to resources with a specific menu_order value.',
            type: GraphQLInt,
        },
        offset: {
            description: 'Offset the result set by a specific number of items.',
            type: GraphQLInt,
        },
        order: {
            description: 'Order sort attribute ascending or descending.',
            type: GraphQLString,
        },
        orderby: {
            description: 'Sort collection by object attribute.',
            type: GraphQLString,
        },
        page: {
            description: 'Current page of the collection.',
            type: GraphQLInt,
        },
        parent: {
            description: 'Limit result set to those of particular parent ids.',
            type: GraphQLInt,
        },
        parent_exclude: {
            description: 'Limit result set to all items except those of a particular parent id.',
            type: GraphQLInt,
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
            type: GraphQLString,
        },
    },
    resolve: (_root, args: PagesArgs, context): PromiseLike<Page[]> => context.get('/pages', args),
};

export interface PageArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: 'view'|'embed'|'edit';
    /** The ID of the page. */
    id: number;
    /** The password for the post if it is password protected. */
    password?: string;
}

const page: StrongTypedFieldConfig<PageArgs, any, any> = {
    type: pageType,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        id: {
            description: 'The ID of the page.',
            type: new GraphQLNonNull(GraphQLInt),
        },
        password: {
            description: 'The password for the post if it is password protected.',
            type: GraphQLString,
        },
    },
    resolve: (_root, { id, ...args }: PageArgs, context): PromiseLike<Page> => context.get(`/pages/${id}`, args),
};

export default {
    pages,
    page,
};
