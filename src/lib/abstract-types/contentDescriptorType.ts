import {
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { TypedFields } from '../strongTypes';

export interface ContentDescriptor {
    /** Boolean describing whether or not the content is protected. */
    protected: boolean;
    /** The raw text without markup of the content. */
    raw: string;
    /** The raw HTML for the rendered content. */
    rendered: string;
};

const fields: TypedFields<ContentDescriptor> = {
    protected: {
        description: 'Boolean describing whether or not the content is protected.',
        type: GraphQLBoolean,
    },
    raw: {
        description: 'The raw text without markup of the content.',
        type: GraphQLString,
    },
    rendered: {
        description: 'The raw HTML for the rendered content.',
        type: GraphQLString,
    },
};

export const contentDescriptorType = new GraphQLObjectType({
    name: 'ContentDescriptor',
    description: 'Simple descriptor object for post content.',
    fields: () => ({
        ...fields,
    }),
});
