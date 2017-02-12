import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLObjectTypeConfig,
    GraphQLString,
} from 'graphql';
import { TypedFields } from '../../../lib/strongTypes';

export interface Tag {
    /** Number of published posts for the term. */
    readonly count: number;
    /** HTML description of the term. */
    description: string;
    /** Unique identifier for the term. */
    readonly id: number;
    /** URL of the term. */
    readonly link: string;
    /** Meta fields. */
    meta: any[];
    /** HTML title for the term. */
    name: string;
    /** An alphanumeric identifier for the term unique to its type. */
    slug: string;
    /** Type attribution for the term. */
    readonly taxonomy: string;
}

const tagFields: TypedFields<Tag, Tag, {}> = {
    count: {
        description: 'Number of published posts for the term.',
        type: GraphQLInt,
    },
    description: {
        description: 'HTML description of the term.',
        type: GraphQLString,
    },
    id: {
        description: 'Unique identifier for the term.',
        type: new GraphQLNonNull(GraphQLInt),
    },
    link: {
        description: 'URL of the term.',
        type: GraphQLString,
    },
    meta: {
        description: 'Meta fields.',
        type: new GraphQLList(GraphQLString),
    },
    name: {
        description: 'HTML title for the term.',
        type: GraphQLString,
    },
    slug: {
        description: 'An alphanumeric identifier for the term unique to its type.',
        type: GraphQLString,
    },
    taxonomy: {
        description: 'Type attribution for the term.',
        type: GraphQLString,
    },
};

export default new GraphQLObjectType(<GraphQLObjectTypeConfig<Tag, {}>>{
    name: 'Tag',
    description: 'A single tag object.',
    fields: () => ({
        ...tagFields,
    }),
});
