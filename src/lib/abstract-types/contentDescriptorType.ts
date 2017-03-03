import {
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { TypedFields } from '../strongTypes';

export interface RawOrRendered {
    /** The raw text without markup of the content. */
    raw: string;
    /** The raw HTML for the rendered content. */
    rendered: string;
}

export interface ContentDescriptor extends RawOrRendered {
    /** Boolean describing whether or not the content is protected. */
    protected: boolean;
};

const baseFields: TypedFields<RawOrRendered> = {
    raw: {
        description: 'The raw text without markup of the content. (Requires authentication)',
        type: GraphQLString,
    },
    rendered: {
        description: 'The HTML for the rendered content.',
        type: GraphQLString,
    },
};

export const rawOrRenderedType = new GraphQLObjectType({
    name: 'RawOrRendered',
    fields: () => ({
        ...baseFields,
    }),
});

export const contentDescriptorType = new GraphQLObjectType({
    name: 'ContentDescriptor',
    description: 'Simple descriptor object for post content.',
    fields: () => ({
        protected: {
            description: 'Boolean describing whether or not the content is protected.',
            type: GraphQLBoolean,
        },
        ...baseFields,
    }),
});
