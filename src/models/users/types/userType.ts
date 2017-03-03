import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { Meta, TypedFields } from '../../../lib/strongTypes';

interface UserAvatarUrlsRaw {
    /** 24x24 avatar url. */
    24: string;
    /** 48x48 avatar url. */
    48: string;
    /** 96x96 avatar url. */
    96: string;
}

export interface UserAvatarUrls {
    /** 24x24 avatar url. */
    size24: string;
    /** 48x48 avatar url. */
    size48: string;
    /** 96x96 avatar url. */
    size96: string;
}

const avatarFields: TypedFields<UserAvatarUrls, UserAvatarUrlsRaw> = {
    size24: {
            description: '24x24 avatar url.',
            type: GraphQLString,
            resolve: avatar => avatar['24'],
        },
        size48: {
            description: '48x48 avatar url.',
            type: GraphQLString,
            resolve: avatar => avatar['48'],
        },
        size96: {
            description: '96x96 avatar url.',
            type: GraphQLString,
            resolve: avatar => avatar['96'],
        },
};

export const avatarObjectType = new GraphQLObjectType({
    name: 'AvatarObject',
    description: 'Object containing user avatars.',
    fields: () => ({
        ...avatarFields,
    }),
});

export interface UserBase<TMeta> {
    /** Avatar URLs for the user. */
    avatar_urls: UserAvatarUrls;
    /** Description of the user. */
    description: string;
    /** The email address for the user. */
    email: string;
    /** First name for the user. */
    first_name: string;
    /** Unique identifier for the user. */
    readonly id: number;
    /** Last name for the user. */
    last_name: string;
    /** Author URL of the user. */
    link: string;
    /** Locale for the user. */
    locale: string;
    /** Expected shape of the user meta. */
    meta: TMeta;
    /** Display name for the user. */
    name: string;
    /** The nickname for the user. */
    nickname: string;
    /** Registration date for the user. (ISO8601) */
    readonly registered_date: string;
    /** Roles assigned to the user. */
    roles: string[];
    /** An alphanumeric identifier for the user. */
    slug: string;
    /** URL of the user. */
    url: string;
    /** Login name for the user. */
    username: string;
};

export interface UserRaw extends UserBase<object> {
    /** All capabilities assigned to the user. */
    capabilities: {
        [capabilityName: string]: true;
    };
    /** Any extra capabilities assigned to the user. */
    extra_capabilities: {
        [capabilityName: string]: true;
    };
}

export interface User<TMeta = Meta> extends UserBase<TMeta> {
    /** All capabilities assigned to the user. */
    capabilities: string[];
    /** Any extra capabilities assigned to the user. */
    extra_capabilities: string[];
    /** Expected shape of the user meta. */
    meta: TMeta;
}

const userFields: TypedFields<User, UserRaw> = {
    avatar_urls: {
        description: 'Avatar URLs for the user.',
        type: avatarObjectType,
    },
    capabilities: {
        description: 'All capabilities assigned to the user.',
        type: new GraphQLList(GraphQLString),
        resolve: user => Object.keys(user.capabilities),
    },
    description: {
        description: 'Description of the user.',
        type: GraphQLString,
    },
    extra_capabilities: {
        description: 'Any extra capabilities assigned to the user.',
        type: new GraphQLList(GraphQLString),
        resolve: user => Object.keys(user.extra_capabilities),
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
        description: 'Unique identifier for the user.',
        type: new GraphQLNonNull(GraphQLInt),
    },
    last_name: {
        description: 'Last name for the user.',
        type: GraphQLString,
    },
    link: {
        description: 'Author URL of the user.',
        type: GraphQLString,
    },
    locale: {
        description: 'Locale for the user.',
        type: GraphQLString,
    },
    meta: {
        description: 'JSON stringified meta fields.',
        type: GraphQLString,
        resolve: user => JSON.stringify(user.meta),
    },
    name: {
        description: 'Display name for the user.',
        type: GraphQLString,
    },
    nickname: {
        description: 'The nickname for the user.',
        type: GraphQLString,
    },
    registered_date: {
        description: 'Registration date for the user. (ISO8601)',
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
};

export default new GraphQLObjectType({
    name: 'User',
    description: 'A WordPress User Object.',
    fields: () => ({
        ...userFields,
    }),
});
