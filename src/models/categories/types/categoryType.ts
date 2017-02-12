import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { TypedFields } from '../../../lib/strongTypes';

export interface Category {
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
    /** The parent term ID. */
    parent: number;
    /** An alphanumeric identifier for the term unique to its type. */
    slug: string;
    /** Type attribution for the term. */
    taxonomy: 'category'|'post_tag'|'nav_menu'|'link_category'|'post_format';
}

type fields = TypedFields<Category, Category, {}>;
const categoryFields: fields = {
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
    parent: {
        description: 'The parent term ID.',
        type: GraphQLInt,
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

export default new GraphQLObjectType({
    name: 'Category',
    description: 'A single category.',
    fields: () => ({
        ...categoryFields,
    }),
});
