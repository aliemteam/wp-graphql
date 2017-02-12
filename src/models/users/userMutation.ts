import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { ArgumentField } from '../../lib/strongTypes';
import deletedObjectFactory, { DeletedObject } from '../../lib/type-factories/deletedObjectFactory';
import userType, { User } from './types/userType';

export const deletedUserType: GraphQLObjectType = deletedObjectFactory(userType);

export interface UserMutationOptions {
    /** Description of the user. */
    description?: string;
    /** The email address for the user. */
    email?: string;
    /** First name for the user. */
    first_name?: string;
    /** Last name for the user. */
    last_name?: string;
    /** Locale for the user. */
    locale?: string;
    /** Meta fields. */
    meta?: any[];
    /** Display name for the user. */
    name?: string;
    /** The nickname for the user. */
    nickname?: string;
    /** Password for the user (never included). */
    password?: string;
    /** Roles assigned to the user. */
    roles?: string[];
    /** An alphanumeric identifier for the user. */
    slug?: string;
    /** URL of the user. */
    url?: string;
    /** Login name for the user. */
    username?: string;
}

export interface CreateUserArgs extends UserMutationOptions {
    /** The email address for the user. */
    email: string;
    /** Password for the user (never included). */
    password: string;
    /** Login name for the user. */
    username: string;
}

const createUser: ArgumentField<CreateUserArgs, any, any> = {
    description: 'Create a new user.',
    type: userType,
    args: {
        description: {
            description: 'Description of the user.',
            type: GraphQLString,
        },
        email: {
            description: 'The email address for the user.',
            type: new GraphQLNonNull(GraphQLString),
        },
        first_name: {
            description: 'First name for the user.',
            type: GraphQLString,
        },
        last_name: {
            description: 'Last name for the user.',
            type: GraphQLString,
        },
        locale: {
            description: 'Locale for the user.',
            type: GraphQLString,
        },
        meta: {
            description: 'Meta fields.',
            type: new GraphQLList(GraphQLString),
        },
        name: {
            description: 'Display name for the user.',
            type: GraphQLString,
        },
        nickname: {
            description: 'The nickname for the user.',
            type: GraphQLString,
        },
        password: {
            description: 'Password for the user (never included).',
            type: new GraphQLNonNull(GraphQLString),
        },
        roles: {
            description: 'Roles assigned to the user.',
            type: new GraphQLList(GraphQLString),
        },
        slug: {
            description: 'An alphanumeric identifier for the user.',
            type: GraphQLString,
        },
        url: {
            description: 'URL of the user.',
            type: GraphQLString,
        },
        username: {
            description: 'Login name for the user.',
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve: (_root, args: CreateUserArgs, context): PromiseLike<User> => context.post('/users', args),
};

export interface UpdateUserArgs extends UserMutationOptions {
    /** ID of the user being mutated. */
    id: number;
}

const updateUser: ArgumentField<UpdateUserArgs, any, any> = {
    description: 'Update a user by ID.',
    type: userType,
    args: {
        description: {
            description: 'Description of the user.',
            type: GraphQLString,
        },
        email: {
            description: 'The email address for the user.',
            type: GraphQLString,
        },
        first_name: {
            description: 'First name for the user.',
            type: GraphQLString,
        },
        id: {
            description: 'ID of the user being mutated.',
            type: new GraphQLNonNull(GraphQLInt),
        },
        last_name: {
            description: 'Last name for the user.',
            type: GraphQLString,
        },
        locale: {
            description: 'Locale for the user.',
            type: GraphQLString,
        },
        meta: {
            description: 'Meta fields.',
            type: new GraphQLList(GraphQLString),
        },
        name: {
            description: 'Display name for the user.',
            type: GraphQLString,
        },
        nickname: {
            description: 'The nickname for the user.',
            type: GraphQLString,
        },
        password: {
            description: 'Password for the user (never included).',
            type: GraphQLString,
        },
        roles: {
            description: 'Roles assigned to the user.',
            type: new GraphQLList(GraphQLString),
        },
        slug: {
            description: 'An alphanumeric identifier for the user.',
            type: GraphQLString,
        },
        url: {
            description: 'URL of the user.',
            type: GraphQLString,
        },
        username: {
            description: 'Login name for the user.',
            type: GraphQLString,
        },
    },
    resolve: (_root, { id, ...args }: UpdateUserArgs, context): PromiseLike<User> => context.post(`/users/${id}`, args),
};

export interface DeleteUserArgs {
    /** Always set to true internally. Must be true to complete request. */
    force: true;
    /** ID of user being deleted. */
    id: number;
    /** Reassign the deleted user’s posts and links to this user ID. */
    reassign?: number;
}

const deleteUser: ArgumentField<DeleteUserArgs, any, any> = {
    description: 'Delete a user by ID.',
    type: deletedUserType,
    args: {
        force: {
            description: 'Always set to true internally. Must be true to complete request.',
            type: GraphQLBoolean,
            defaultValue: true,
        },
        id: {
            description: 'ID of user being deleted.',
            type: new GraphQLNonNull(GraphQLInt),
        },
        reassign: {
            description: 'Reassign the deleted user’s posts and links to this user ID.',
            type: GraphQLInt,
            defaultValue: -1,
        },
    },
    resolve: (_root, { id, ...args }: DeleteUserArgs, context): PromiseLike<DeletedObject<User>> => (
        context.delete(`/users/${id}`, args)
    ),
};

export default {
    createUser,
    updateUser,
    deleteUser,
};
