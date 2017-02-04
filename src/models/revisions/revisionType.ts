import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLObjectTypeConfig,
    GraphQLString,
} from 'graphql';
import { TypedFields } from '../shared/strongTypes';

export interface RevisionBase {
    author: string;
    date: string;
    date_gmt: string;
    id: number;
    modified: string;
    modified_gmt: string;
    parent: number;
    slug: string;
}

export interface RawRevision extends RevisionBase {
    guid: {
        rendered: string;
    };
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
}

export interface Revision extends RevisionBase {
    content: string;
    excerpt: string;
    guid: string;
    title: string;
}

type T = RevisionBase & RawRevision;
type config = GraphQLObjectTypeConfig<T, {}>;
type fields = TypedFields<T, T, {}>;

const revisionFields: fields = {
    author: {
        type: GraphQLString,
    },
    content: {
        type: GraphQLString,
        resolve: revision => revision.content.rendered,
    },
    date: {
        type: GraphQLString,
    },
    date_gmt: {
        type: GraphQLString,
    },
    excerpt: {
        type: GraphQLString,
        resolve: revision => revision.excerpt.rendered,
    },
    guid: {
        type: GraphQLString,
        resolve: revision => revision.guid.rendered,
    },
    id: {
        type: GraphQLInt,
    },
    modified: {
        type: GraphQLString,
    },
    modified_gmt: {
        type: GraphQLString,
    },
    parent: {
        type: GraphQLInt,
    },
    slug: {
        type: GraphQLString,
    },
    title: {
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
