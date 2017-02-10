import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { Context, contextType, enumFactory, Order, orderType } from '../../lib/abstract-types'
import { ArgumentField } from '../../lib/strongTypes';
import commentType, { Comment } from './commentType';

export interface CommentsArgs {
    /** Limit response to resources published after a given ISO8601 compliant date. */
    after?: string;
    /** Limit result set to comments assigned to specific user ids. Requires authorization. */
    author?: number[];
    /** Limit result set to that from a specific author email. Requires authorization. */
    author_email?: string;
    /** Ensure result set excludes comments assigned to specific user ids. Requires authorization. */
    author_exclude?: number[];
    /** Limit response to resources published before a given ISO8601 compliant date. */
    before?: string;
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
    /** Ensure result set excludes specific ids. */
    exclude?: number[];
    /** Limit result set to specific ids. */
    include?: number[];
    /** Limit result set to that of a particular comment karma. Requires authorization. */
    karma?: number;
    /** Offset the result set by a specific number of comments. */
    offset?: number;
    /** Order sort attribute ascending or descending. */
    order?: Order;
    /** Sort collection by object attribute. */
    orderby?: 'date'|'date_gmt'|'id'|'include'|'post'|'parent'|'type';
    /** Current page of the collection. */
    page?: number;
    /** Limit result set to resources of specific parent ids. */
    parent?: number[];
    /** Ensure result set excludes specific parent ids. */
    parent_exclude?: number[];
    /** Maximum number of items to be returned in result set. */
    per_page?: number;
    /** Limit result set to resources assigned to specific post ids. */
    post?: string;
    /** Limit results to those matching a string. */
    search?: string;
    /** Limit result set to comments assigned a specific status. Requires authorization. */
    status?: string;
    /** Limit result set to comments assigned a specific type. Requires authorization. */
    type?: string;
}

const comments: ArgumentField<CommentsArgs, any, any> = {
    description: 'Fetch a list of comments.',
    type: new GraphQLList(commentType),
    args: {
        after: {
            description: 'Limit response to resources published after a given ISO8601 compliant date.',
            type: GraphQLString,
        },
        author: {
            description: 'Limit result set to comments assigned to specific user ids. Requires authorization.',
            type: new GraphQLList(GraphQLInt),
        },
        author_email: {
            description: 'Limit result set to that from a specific author email. Requires authorization.',
            type: GraphQLString,
        },
        author_exclude: {
            description: 'Ensure result set excludes comments assigned to specific user ids. Requires authorization.',
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
        include: {
            description: 'Limit result set to specific ids.',
            type: new GraphQLList(GraphQLInt),
        },
        karma: {
            description: 'Limit result set to that of a particular comment karma. Requires authorization.',
            type: GraphQLInt,
        },
        offset: {
            description: 'Offset the result set by a specific number of comments.',
            type: GraphQLInt,
        },
        order: {
            description: 'Order sort attribute ascending or descending.',
            type: orderType,
        },
        orderby: {
            description: 'Sort collection by object attribute.',
            type: enumFactory('CommentsOrderby', [
                'date',
                'date_gmt',
                'id',
                'include',
                'parent',
                'post',
                'type',
            ]),
        },
        page: {
            description: 'Current page of the collection.',
            type: GraphQLInt,
        },
        parent: {
            description: 'Limit result set to resources of specific parent ids.',
            type: new GraphQLList(GraphQLInt),
        },
        parent_exclude: {
            description: 'Ensure result set excludes specific parent ids.',
            type: new GraphQLList(GraphQLInt),
        },
        per_page: {
            description: 'Maximum number of items to be returned in result set.',
            type: GraphQLInt,
        },
        post: {
            description: 'Limit result set to resources assigned to specific post ids.',
            type: GraphQLString,
        },
        search: {
            description: 'Limit results to those matching a string.',
            type: GraphQLString,
        },
        status: {
            description: 'Limit result set to comments assigned a specific status. Requires authorization.',
            type: GraphQLString,
        },
        type: {
            description: 'Limit result set to comments assigned a specific type. Requires authorization.',
            type: GraphQLString,
        },
    },
    resolve: (_root, args: CommentsArgs, context): PromiseLike<Comment[]> => context.get('/comments', args),
};

export interface CommentArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
    /** ID of the comment being requested. */
    id: number;
}

const comment: ArgumentField<CommentArgs, any, any> = {
    description: 'Fetch a single comment',
    type: commentType,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        id: {
            description: 'ID of the comment being requested.',
            type: new GraphQLNonNull(GraphQLInt),
        },
    },
    resolve: (_root, { id, ...args }: CommentArgs, context): PromiseLike<Comment> => (
        context.get(`/comments/${id}`, args)
    ),
};

export default {
    comments,
    comment,
};
