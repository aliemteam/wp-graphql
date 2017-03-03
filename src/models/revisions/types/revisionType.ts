import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import {
    ContentDescriptor,
    contentDescriptorType,
    RawOrRendered,
    rawOrRenderedType,
} from '../../../lib/abstract-types';
import { TypedFields } from '../../../lib/strongTypes';

export interface Revision {
    /** The id for the author of the object. */
    author: number;
    /** Content for the object, as it exists in the database. */
    content: ContentDescriptor;
    /** The date the object was published. */
    date: string;
    /** The date the object was published, as GMT. */
    date_gmt: string;
    /** Excerpt for the object, as it exists in the database. */
    excerpt: ContentDescriptor;
    /** GUID for the object, as it exists in the database. */
    readonly guid: RawOrRendered;
    /** Unique identifier for the object. */
    id: number;
    /** The date the object was last modified. */
    modified: string;
    /** The date the object was last modified, as GMT. */
    modified_gmt: string;
    /** The id for the parent of the object. */
    parent: number;
    /** An alphanumeric identifier for the object unique to its type. */
    slug: string;
    /** Title for the object, as it exists in the database. */
    title: RawOrRendered;
}

const revisionFields: TypedFields<Revision> = {
    author: {
        description: 'The id for the author of the object.',
        type: GraphQLInt,
    },
    content: {
        description: 'Content for the object, as it exists in the database.',
        type: contentDescriptorType,
    },
    date: {
        description: 'The date the object was published. (ISO8601)',
        type: GraphQLString,
    },
    date_gmt: {
        description: 'The date the object was published, as GMT.',
        type: GraphQLString,
    },
    excerpt: {
        description: 'Excerpt for the object, as it exists in the database.',
        type: contentDescriptorType,
    },
    guid: {
        description: 'GUID for the object, as it exists in the database.',
        type: rawOrRenderedType,
    },
    id: {
        description: 'Unique identifier for the object.',
        type: GraphQLInt,
    },
    modified: {
        description: 'The date the object was last modified.',
        type: GraphQLString,
    },
    modified_gmt: {
        description: 'The date the object was last modified, as GMT.',
        type: GraphQLString,
    },
    parent: {
        description: 'The id for the parent of the object.',
        type: GraphQLInt,
    },
    slug: {
        description: 'An alphanumeric identifier for the object unique to its type.',
        type: GraphQLString,
    },
    title: {
        description: 'Title for the object, as it exists in the database.',
        type: rawOrRenderedType,
    },
};

export default new GraphQLObjectType({
    name: 'Revision',
    description: 'A post revision object.',
    fields: () => ({
        ...revisionFields,
    }),
});
