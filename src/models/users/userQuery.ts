import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { Context, contextType, Order, orderType } from '../../lib/abstract-types/';
import { namespace as NS } from '../../lib/constants';
import { ArgumentField } from '../../lib/strongTypes';
import enumFactory from '../../lib/type-factories/enumFactory';
import userType, { User } from './types/userType';

export interface UsersArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
    /** Ensure result set excludes specific IDs. */
    exclude?: number[];
    /** Limit result set to specific IDs. */
    include?: number[];
    /** Offset the result set by a specific number of items. */
    offset?: number;
    /** Order sort attribute ascending or descending. */
    order?: Order;
    /** Sort collection by object attribute. */
    orderby?: 'id'|'include'|'name'|'registered_date'|'slug'|'email'|'url';
    /** Current page of the collection. */
    page?: number;
    /** Maximum number of items to be returned in result set. */
    per_page?: number;
    /** Limit result set to users matching at least one specific role provided. Accepts csv list or single role. */
    roles?: string[];
    /** Limit results to those matching a string. */
    search?: string;
    /** Limit result set to users with a specific slug. */
    slug?: string;
}

const users: ArgumentField<UsersArgs> = {
    type: new GraphQLList(userType),
    description: 'Fetch a list of all users.',
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        exclude: {
            description: 'Ensure result set excludes specific IDs.',
            type: new GraphQLList(GraphQLInt),
        },
        include: {
            description: 'Limit result set to specific IDs.',
            type: new GraphQLList(GraphQLInt),
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
            type: enumFactory('UserOrderBy', [
                'email',
                'id',
                'include',
                'name',
                'registered_date',
                'slug',
                'url',
            ]),
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
            type: new GraphQLList(GraphQLString),
        },
        slug: {
            description: 'Limit result set to users with a specific slug.',
            type: GraphQLString,
        },
    },
    resolve: (root, args: UsersArgs): PromiseLike<User[]> => (
        root.get(`/${NS}/users`, args)
    ),
};

export interface UserArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
    /** ID for the user. */
    id: number;
}

const user: ArgumentField<UserArgs> = {
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
    resolve: (root, { id, ...args }: UserArgs): PromiseLike<User> => (
        root.get(`/${NS}/users/${id}`, args)
    ),
};

export interface MeArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
}

const me: ArgumentField<MeArgs> = {
    type: userType,
    description: 'Retrieve the currently logged in user.',
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
            defaultValue: 'edit',
        },
    },
    resolve: (root, args: MeArgs): PromiseLike<User> => (
        root.get(`/${NS}/users/me`, args)
    ),
};

export default {
    users,
    user,
    me,
};
