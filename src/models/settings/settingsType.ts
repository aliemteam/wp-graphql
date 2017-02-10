import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { TypedFields } from '../../lib/strongTypes';

export interface Settings {
    /** A date format for all date strings. */
    date_format: string;
    /** ID of default category. */
    default_category: number;
    /** Either "open" or "closed". */
    default_comment_status: 'open'|'closed';
    /** Either "open" or "closed". */
    default_ping_status: 'open'|'closed';
    /** Default post format. */
    default_post_format: string;
    /** Site description. */
    description: string;
    /** This address is used for admin purposes. */
    email: string;
    /** WordPress locale code. */
    language: string;
    /** Blog pages show at most. */
    posts_per_page: number;
    /** A day number of the week that the week should start on. */
    start_of_week: number;
    /** A time format for all time strings. */
    time_format: string;
    /** A city in the same timezone as you. */
    timezone: string;
    /** Site title. */
    title: string;
    /** Site URL. */
    url: string;
    /** Convert emoticons like :-) and :-P to graphics on display. */
    use_smilies: boolean;
}

const settingsFields: TypedFields<Settings, Settings, any> = {
    date_format: {
        description: 'A date format for all date strings.',
        type: GraphQLString,
    },
    default_category: {
        description: 'ID of default category.',
        type: GraphQLInt,
    },
    default_comment_status: {
        description: 'Either "open" or "closed".',
        type: GraphQLString,
    },
    default_ping_status: {
        description: 'Either "open" or "closed".',
        type: GraphQLString,
    },
    default_post_format: {
        description: 'Default post format.',
        type: GraphQLString,
    },
    description: {
        description: 'Site description.',
        type: GraphQLString,
    },
    email: {
        description: 'This address is used for admin purposes.',
        type: GraphQLString,
    },
    language: {
        description: 'WordPress locale code.',
        type: GraphQLString,
    },
    posts_per_page: {
        description: 'Blog pages show at most.',
        type: GraphQLInt,
    },
    start_of_week: {
        description: 'A day number of the week that the week should start on.',
        type: GraphQLInt,
    },
    time_format: {
        description: 'A time format for all time strings.',
        type: GraphQLString,
    },
    timezone: {
        description: 'A city in the same timezone as you.',
        type: GraphQLString,
    },
    title: {
        description: 'Site title.',
        type: GraphQLString,
    },
    url: {
        description: 'Site URL.',
        type: GraphQLString,
    },
    use_smilies: {
        description: 'Convert emoticons like :-) and :-P to graphics on display.',
        type: GraphQLBoolean,
    },
};

export default new GraphQLObjectType({
    name: 'Settings',
    description: 'Object containing site settings.',
    fields: () => ({
        ...settingsFields,
    }),
});
