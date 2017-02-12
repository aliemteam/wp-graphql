import {
    GraphQLBoolean,
    GraphQLList,
    GraphQLObjectType,
    GraphQLObjectTypeConfig,
    GraphQLString,
} from 'graphql';
import { TaxonomyLabels, taxonomyLabelsType } from '../../../lib/abstract-types';
import { TypedFields } from '../../../lib/strongTypes';

/** All Capabilities used by a taxonomy. */
export interface TaxonomyCapabilities {
    assign_terms: string;
    delete_terms: string;
    edit_terms: string;
    manage_terms: string;
}

export const taxonomyCapabilitiesType = new GraphQLObjectType({
    name: 'TaxonomyCapabilities',
    description: 'All capabilities used by the taxonomy.',
    fields: () => ({
        assign_terms: {
            description: 'Unique label for "assign_terms" field',
            type: GraphQLString,
        },
        delete_terms: {
            description: 'Unique label for "delete_terms" field',
            type: GraphQLString,
        },
        edit_terms: {
            description: 'Unique label for "edit_terms" field',
            type: GraphQLString,
        },
        manage_terms: {
            description: 'Unique label for "manage_terms" field',
            type: GraphQLString,
        },
    }),
});

export interface Taxonomy {
    /** All capabilities used by the taxonomy. */
    capabilities: TaxonomyCapabilities;
    /** A human-readable description of the taxonomy. */
    description: string;
    /** Whether or not the taxonomy should have children. */
    hierarchial: boolean;
    /** Human-readable labels for the taxonomy for various contexts. */
    labels: TaxonomyLabels;
    /** The title for the taxonomy. */
    name: string;
    /** REST base route for the taxonomy. */
    rest_base: string;
    /** Whether or not the term cloud should be displayed. */
    show_cloud: boolean;
    /** An alphanumeric identifier for the taxonomy. */
    slug: string;
    /** Types associated with the taxonomy. */
    types: string[];
}

const taxonomyFields: TypedFields<Taxonomy, Taxonomy, {}> = {
    capabilities: {
        description: 'All capabilities used by the taxonomy.',
        type: taxonomyCapabilitiesType,
    },
    description: {
        description: 'A human-readable description of the taxonomy.',
        type: GraphQLString,
    },
    hierarchial: {
        description: 'Whether or not the taxonomy should have children.',
        type: GraphQLBoolean,
    },
    labels: {
        description: 'Human-readable labels for the taxonomy for various contexts.',
        type: taxonomyLabelsType,
    },
    name: {
        description: 'The title for the taxonomy.',
        type: GraphQLString,
    },
    rest_base: {
        description: 'REST base route for the taxonomy.',
        type: GraphQLString,
    },
    show_cloud: {
        description: 'Whether or not the term cloud should be displayed.',
        type: GraphQLBoolean,
    },
    slug: {
        description: 'An alphanumeric identifier for the taxonomy.',
        type: GraphQLString,
    },
    types: {
        description: 'Types associated with the taxonomy.',
        type: new GraphQLList(GraphQLString),
    },
};

type config = GraphQLObjectTypeConfig<Taxonomy, {}>;
export default new GraphQLObjectType(<config>{
    name: 'Taxonomy',
    description: 'A single taxonomy object.',
    fields: () => ({
        ...taxonomyFields,
    }),
});
