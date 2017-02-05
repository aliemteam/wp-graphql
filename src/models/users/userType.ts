import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLObjectTypeConfig,
    GraphQLString,
} from 'graphql';
import { TypedFields } from '../../lib/strongTypes';

interface RawUserAvatarUrls {
    24: string;
    48: string;
    96: string;
}

export interface UserAvatarUrls {
    size24: string;
    size48: string;
    size96: string;
}

type avatarConfig = GraphQLObjectTypeConfig<RawUserAvatarUrls, {}>;
const avatarObjectType = new GraphQLObjectType(<avatarConfig>{
    name: 'AvatarObject',
    description: 'Object containing user avatars.',
    fields: () => ({
        size24: {
            type: GraphQLString,
            resolve: avatar => avatar['24'],
        },
        size48: {
            type: GraphQLString,
            resolve: avatar => avatar['48'],
        },
        size96: {
            type: GraphQLString,
            resolve: avatar => avatar['96'],
        },
    }),
});

export interface UserBase {
    avatar_urls: UserAvatarUrls;
    description: string;
    email: string;
    first_name: string;
    readonly id: number;
    last_name: string;
    link: string;
    locale: string;
    meta: any[];
    name: string;
    nickname: string;
    readonly registered_date: string;
    roles: string[];
    slug: string;
    url: string;
    username: string;
};

export interface RawUser extends UserBase {
    capabilities: {
        [capabilityName: string]: true;
    };
    extra_capabilities: {
        [capabilityName: string]: true;
    };
}

export interface User extends UserBase {
    capabilities: string[];
    extra_capabilities: string[];
}

type T = UserBase & RawUser;
type config = GraphQLObjectTypeConfig<T, {}>;
type fields = TypedFields<T, T, {}>;

const userFields: fields = {
    avatar_urls: {
        type: avatarObjectType,
    },
    capabilities: {
        type: new GraphQLList(GraphQLString),
        resolve: user => Object.keys(user.capabilities),
    },
    description: {
        type: GraphQLString,
    },
    extra_capabilities: {
        type: new GraphQLList(GraphQLString),
        resolve: user => Object.keys(user.extra_capabilities),
    },
    email: {
        type: GraphQLString,
    },
    first_name: {
        type: GraphQLString,
    },
    id: {
        type: new GraphQLNonNull(GraphQLInt),
    },
    last_name: {
        type: GraphQLString,
    },
    link: {
        type: GraphQLString,
    },
    locale: {
        type: GraphQLString,
    },
    meta: {
        type: new GraphQLList(GraphQLString),
    },
    name: {
        type: GraphQLString,
    },
    nickname: {
        type: GraphQLString,
    },
    registered_date: {
        type: GraphQLString,
    },
    roles: {
        type: new GraphQLList(GraphQLString),
    },
    slug: {
        type: GraphQLString,
    },
    url: {
        type: GraphQLString,
    },
    username: {
        type: GraphQLString,
    },
};

export default new GraphQLObjectType(<config>{
    name: 'User',
    description: 'A WordPress User Object.',
    fields: () => ({
        ...userFields,
    }),
});
