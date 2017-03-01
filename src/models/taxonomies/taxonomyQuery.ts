import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { Context, contextType } from '../../lib/abstract-types/';
import { namespace as NS } from '../../lib/constants';
import { ArgumentField } from '../../lib/strongTypes';
import taxonomyType, { Taxonomy } from './types/taxonomyType';

const transformTaxonomyObject = (obj: { [key: string]: Taxonomy }): Taxonomy[] => (
    Object.keys(obj).map(k => obj[k])
);

export interface TaxonomiesArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
    /** Limit results to taxonomies associated with a specific post type. */
    type?: string;
}

const taxonomies: ArgumentField<TaxonomiesArgs> = {
    description: 'List all taxonomies.',
    type: new GraphQLList(taxonomyType),
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        type: {
            description: 'Limit results to taxonomies associated with a specific post type.',
            type: GraphQLString,
        },
    },
    resolve: (root, args: TaxonomiesArgs) => (
        root.get(`/${NS}/taxonomies`, args).then(transformTaxonomyObject)
    ),
};

export interface TaxonomyArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
    /** Slug of the specific taxonomy being queried. */
    slug: string;
}

const taxonomy: ArgumentField<TaxonomyArgs> = {
    description: 'Fetch a single taxonomy.',
    type: taxonomyType,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        slug: {
            description: 'Slug of the specific taxonomy being queried.',
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve: (root, { slug, ...args }: TaxonomyArgs) => (
        root.get<Taxonomy>(`/${NS}/taxonomies/${slug}`, args)
    ),
};

export default {
    taxonomies,
    taxonomy,
};
