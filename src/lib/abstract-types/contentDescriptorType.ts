import {
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLObjectTypeConfig,
    GraphQLString,
} from 'graphql';

export interface ContentDescriptor {
    /** Boolean describing whether or not the content is protected. */
    protected: boolean;
    /** The raw text without markup of the content. */
    raw: string;
    /** The raw HTML for the rendered content. */
    rendered: string;
};

type contentDescriptorConfig = GraphQLObjectTypeConfig<ContentDescriptor, {}>;

export const contentDescriptorType = new GraphQLObjectType(<contentDescriptorConfig>{
    name: 'ContentDescriptor',
    description: 'Simple descriptor object for post content.',
    fields: () => ({
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
    }),
});
