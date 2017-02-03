import {
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLObjectTypeConfig,
    GraphQLString,
} from 'graphql';

export interface ContentDescriptor {
    /** The raw HTML for the rendered content. */
    rendered: string;
    /** Boolean describing whether or not the content is protected. */
    protected: boolean;
};

type contentDescriptorConfig = GraphQLObjectTypeConfig<ContentDescriptor, {}>;

export const contentDescriptorType = new GraphQLObjectType(<contentDescriptorConfig>{
    name: 'ContentDescriptor',
    description: 'Simple descriptor object for post content.',
    fields: () => ({
        rendered: {
            type: GraphQLString,
            description: 'The raw HTML for the rendered content.',
        },
        protected: {
            type: GraphQLBoolean,
            description: 'Boolean describing whether or not the content is protected.',
        },
    }),
});
