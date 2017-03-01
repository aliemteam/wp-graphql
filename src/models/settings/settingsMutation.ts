import {
    GraphQLBoolean,
    GraphQLEnumType,
    GraphQLInt,
    GraphQLString,
} from 'graphql';
import { openClosedType } from '../../lib/abstract-types/';
import { namespace as NS } from '../../lib/constants';
import { ArgumentField } from '../../lib/strongTypes';
import settingsType, { Settings } from './types/settingsType';

export const dayOfWeekType = new GraphQLEnumType({
    name: 'DaysOfWeek',
    description: 'Weekday abbreviations to integer enum.',
    values: {
        sun: { value: 0 },
        mon: { value: 1 },
        tues: { value: 2 },
        wed: { value: 3 },
        thurs: { value: 4 },
        fri: { value: 5 },
        sat: { value: 6 },
    },
});

const updateSettings: ArgumentField<Settings> = {
    description: 'Update site settings.',
    type: settingsType,
    args: {
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
            type: openClosedType,
        },
        default_ping_status: {
            description: 'Either "open" or "closed".',
            type: openClosedType,
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
            type: dayOfWeekType,
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
    },
    resolve: (root, args: Settings) => (
        root.post<Settings>(`/${NS}/settings`, args)
    ),
};

export default {
    updateSettings,
};
