import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { contextType } from '../../lib/abstract-types/';
import { StrongTypedFieldConfig } from '../../lib/strongTypes';
import userType, { User } from './userType';

export interface UsersArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: 'view'|'embed'|'edit';
    /** Ensure result set excludes specific IDs. */
    exclude?: string;
    /** Limit result set to specific IDs. */
    include?: string;
    /** Offset the result set by a specific number of items. */
    offset?: number;
    /** Order sort attribute ascending or descending. */
    order?: 'asc'|'desc';
    /** Sort collection by object attribute. */
    orderby?: 'id'|'include'|'name'|'registered_date'|'slug'|'email'|'url';
    /** Current page of the collection. */
    page?: number;
    /** Maximum number of items to be returned in result set. */
    per_page?: number;
    /** Limit result set to users matching at least one specific role provided. Accepts csv list or single role. */
    roles?: string;
    /** Limit results to those matching a string. */
    search?: string;
    /** Limit result set to users with a specific slug. */
    slug?: string;
}

const users: StrongTypedFieldConfig<UsersArgs, any, any> = {
    type: new GraphQLList(userType),
    description: 'Fetch a list of all users.',
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        exclude: {
            description: 'Ensure result set excludes specific IDs.',
            type: GraphQLString,
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
        per_page: {
            description: 'Maximum number of items to be returned in result set.',
            type: GraphQLInt,
        },
        search: {
            description: 'Limit results to those matching a string.',
            type: GraphQLString,
        },
        roles: {
            description: 'Limit result set to users matching at least one ' +
                'specific role provided. Accepts csv list or single role.',
            type: GraphQLString,
        },
        slug: {
            description: 'Limit result set to users with a specific slug.',
            type: GraphQLString,
        },
    },
    resolve: (_root, args: UsersArgs, context): User[] => context.get('/users', args),
};

export interface UserArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: 'view'|'embed'|'edit';
    /** ID for the user. */
    id: number;
}

const user: StrongTypedFieldConfig<UserArgs, any, any> = {
    type: userType,
    description: 'Retrieve a single user.',
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        id: {
            description: 'ID for the user.',
            type: new GraphQLNonNull(GraphQLInt),
        },
    },
    resolve: (_root, { id, ...args }: UserArgs, context): User => context.get(`/users/${id}`, args),
};

export default {
    users,
    user,
};
