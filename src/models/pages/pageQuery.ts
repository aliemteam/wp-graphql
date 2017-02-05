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
    exclude?: number;
    /** Use WP Query arguments to modify the response; private query vars require appropriate authorization. */
    filter?: string; // TODO: Not sure how this works
    /** Limit result set to specific ids. */
    include?: number;
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
        after: { type: GraphQLString },
        author: { type: GraphQLInt },
        author_exclude: { type: GraphQLInt },
        before: { type: GraphQLString },
        context: { type: contextType },
        exclude: { type: GraphQLInt },
        filter: { type: GraphQLString },
        include: { type: GraphQLInt },
        menu_order: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        order: { type: GraphQLString },
        orderby: { type: GraphQLString },
        page: { type: GraphQLInt },
        parent: { type: GraphQLInt },
        parent_exclude: { type: GraphQLInt },
        per_page: { type: GraphQLInt },
        search: { type: GraphQLString },
        slug: { type: GraphQLString },
        status: { type: GraphQLString },
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
        context: { type: contextType },
        id: { type: new GraphQLNonNull(GraphQLInt) },
        password: { type: GraphQLString },
    },
    resolve: (_root, { id, ...args }: PageArgs, context): PromiseLike<Page> => context.get(`/pages/${id}`, args),
};

export default {
    pages,
    page,
};
