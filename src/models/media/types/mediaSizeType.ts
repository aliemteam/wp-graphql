import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { TypedFields } from '../../../lib/strongTypes';

export interface MediaSize {
    /** File name including extension. */
    file: string;
    /** The height of the file. */
    height: number;
    /** The mime_type for the file. */
    mime_type: string;
    /** The name of the size. (eg. "thumbnail") */
    slug: string;
    /** The full URL for the file. */
    source_url: string;
    /** The width of the file. */
    width: number;
}

const mediaSizeFields: TypedFields<MediaSize, MediaSize, any> = {
    file: {
        description: 'File name including extension.',
        type: GraphQLString,
    },
    height: {
        description: 'The height of the file.',
        type: GraphQLInt,
    },
    mime_type: {
        description: 'The mime_type for the file.',
        type: GraphQLString,
    },
    slug: {
        description: 'The name of the size. (eg. "thumbnail")',
        type: GraphQLString,
    },
    source_url: {
        description: 'The full URL for the file.',
        type: GraphQLString,
    },
    width: {
        description: 'The width of the file.',
        type: GraphQLInt,
    },
};

export default new GraphQLObjectType({
    name: 'MediaSize',
    description: 'Details about a single media item at a specific size.',
    fields: () => ({
        ...mediaSizeFields,
    }),
});
