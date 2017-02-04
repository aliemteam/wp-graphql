import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { contextType, StrongTypedFieldConfig } from '../shared/';
import userType, { User } from './userType';

export interface UsersArgs {
    context?: 'view'|'embed'|'edit';
    page?: number;
    per_page?: number;
    search?: string;
    exclude?: string;
    include?: string;
    offset?: number;
    order?: 'asc'|'desc';
    orderby?: 'id'|'include'|'name'|'registered_date'|'slug'|'email'|'url';
    slug?: string;
    roles?: string;
}

const users: StrongTypedFieldConfig<UsersArgs, any, any> = {
    type: new GraphQLList(userType),
    description: 'Fetch a list of all users.',
    args: {
        context: {
            type: contextType,
        },
        page: {
            type: GraphQLInt,
        },
        per_page: {
            type: GraphQLInt,
        },
        search: {
            type: GraphQLString,
        },
        exclude: {
            type: GraphQLString,
        },
        include: {
            type: GraphQLString,
        },
        offset: {
            type: GraphQLInt,
        },
        order: {
            type: GraphQLString,
        },
        orderby: {
            type: GraphQLString,
        },
        slug: {
            type: GraphQLString,
        },
        roles: {
            type: GraphQLString,
        },
    },
    resolve: (_root, args: UsersArgs, context): User[] => context.get('/users', args),
};

export interface UserArgs {
    context?: 'view'|'embed'|'edit';
    id: number;
}

const user: StrongTypedFieldConfig<UserArgs, any, any> = {
    type: userType,
    description: 'Retrieve a single user.',
    args: {
        context: {
            type: contextType,
        },
        id: {
            type: new GraphQLNonNull(GraphQLInt),
        },
    },
    resolve: (_root, { id, ...args }: UserArgs, context): User => context.get(`/users/${id}`, args),
};

export default {
    users,
    user,
};
