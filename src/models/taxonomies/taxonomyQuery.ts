import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { contextType } from '../../lib/abstract-types';
import { StrongTypedFieldConfig } from '../../lib/strongTypes';
import taxonomyType, { Taxonomy } from './taxonomyType';

const transformTaxonomyObject = (obj: { [key: string]: Taxonomy }): Taxonomy[] => (
    Object.keys(obj).map(k => obj[k])
);

export interface TaxonomiesArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: 'view'|'embed'|'edit';
    /** Limit results to taxonomies associated with a specific post type. */
    type?: string;
}

const taxonomies: StrongTypedFieldConfig<TaxonomiesArgs, any, any> = {
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
    resolve: (_root, args: TaxonomiesArgs, context): PromiseLike<Taxonomy[]> => (
        context.get('/taxonomies', args).then(transformTaxonomyObject)
    ),
};

export interface TaxonomyArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: 'view'|'embed'|'edit';
    /** Slug of the specific taxonomy being queried. */
    slug: string;
}

const taxonomy: StrongTypedFieldConfig<TaxonomyArgs, any, any> = {
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
    resolve: (_root, { slug, ...args }: TaxonomyArgs, context): PromiseLike<Taxonomy> => (
        context.get(`/taxonomies/${slug}`, args)
    ),
};

export default {
    taxonomies,
    taxonomy,
};
