import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLObjectTypeConfig,
    GraphQLString,
} from 'graphql';
import { ContentDescriptor, contentDescriptorType } from '../../lib/abstract-types';
import { TypedFields } from '../../lib/strongTypes';

export interface RevisionBase {
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
}

export interface RawRevision extends RevisionBase {
    /** GUID for the object, as it exists in the database. */
    guid: {
        rendered: string;
    };
    /** Title for the object, as it exists in the database. */
    title: {
        rendered: string;
    };
}

export interface Revision extends RevisionBase {
    /** GUID for the object, as it exists in the database. */
    guid: string;
    /** Title for the object, as it exists in the database. */
    title: string;
}

type T = RevisionBase & RawRevision;
type config = GraphQLObjectTypeConfig<T, {}>;
type fields = TypedFields<T, T, {}>;

const revisionFields: fields = {
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
        type: GraphQLString,
        resolve: revision => revision.guid.rendered,
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
        type: GraphQLString,
        resolve: revision => revision.title.rendered,
    },
};

export default new GraphQLObjectType(<config>{
    name: 'Revision',
    description: 'A post revision object.',
    fields: () => ({
        ...revisionFields,
    }),
});
