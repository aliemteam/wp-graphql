import {
    GraphQLObjectType,
    GraphQLScalarType,
    GraphQLString,
} from 'graphql';

export interface SingleLabel {
    description: string;
    type: GraphQLScalarType;
}

export type LabelFields<T> = {
    [K in keyof T]: SingleLabel;
};

export type LabelKeys<T> = Array<keyof T>;

export interface PostLabels {
    add_new: string;
    add_new_item: string;
    all_items: string;
    archives: string;
    attributes: string;
    edit_item: string;
    featured_image: string;
    filter_items_list: string;
    insert_into_item: string;
    items_list: string;
    items_list_navigation: string;
    menu_name: string;
    name: string;
    name_admin_bar: string;
    new_item: string;
    not_found: string;
    not_found_in_trash: string;
    parent_item_colon: string;
    remove_featured_image: string;
    search_items: string;
    set_featured_image: string;
    singular_name: string;
    uploaded_to_this_item: string;
    use_featured_image: string;
    view_item: string;
    view_items: string;
}

export interface TaxonomyLabels {
    add_new_item: string;
    add_or_remove_items: string;
    all_items: string;
    choose_from_most_used: string;
    edit_item: string;
    items_list: string;
    items_list_navigation: string;
    menu_name: string;
    name: string;
    name_admin_bar: string;
    new_item_name: string;
    no_terms: string;
    not_found: string;
    parent_item: string;
    parent_item_colon: string;
    popular_items: string;
    search_items: string;
    separate_items_with_commas: string;
    singular_name: string;
    update_item: string;
    view_item: string;
}

const labelFactory = (key: string): SingleLabel => ({
    description: `Label for "${key}" field.`,
    type: GraphQLString,
});

const postLabelKeys: LabelKeys<PostLabels> = [
    'add_new', 'add_new_item', 'all_items', 'archives', 'attributes',
    'edit_item', 'featured_image', 'filter_items_list', 'insert_into_item',
    'items_list', 'items_list_navigation', 'menu_name', 'name', 'name_admin_bar',
    'new_item', 'not_found', 'not_found_in_trash', 'parent_item_colon',
    'remove_featured_image', 'search_items', 'set_featured_image', 'singular_name',
    'uploaded_to_this_item', 'use_featured_image', 'view_item', 'view_items',
];

const postLabelsFields: LabelFields<PostLabels> = postLabelKeys.reduce((prev, curr) => {
    prev[curr] = labelFactory(curr);
    return prev;
}, <LabelFields<PostLabels>>{});

export const postLabelsType = new GraphQLObjectType({
    name: 'PostLabels',
    description: 'Human-readable labels for the resource for various contexts.',
    fields: () => ({
        ...postLabelsFields,
    }),
});

const taxonomyLabelKeys: LabelKeys<TaxonomyLabels> = [
    'add_new_item', 'add_or_remove_items', 'all_items', 'choose_from_most_used', 'edit_item', 'items_list',
    'items_list_navigation', 'menu_name', 'name', 'name_admin_bar', 'new_item_name', 'no_terms', 'not_found',
    'parent_item', 'parent_item_colon', 'popular_items', 'search_items', 'separate_items_with_commas',
    'singular_name', 'update_item', 'view_item',
];

const taxonomyLabelFields: LabelFields<TaxonomyLabels> = taxonomyLabelKeys.reduce((prev, curr) => {
    prev[curr] = labelFactory(curr);
    return prev;
}, <LabelFields<TaxonomyLabels>>{});

export const taxonomyLabelsType = new GraphQLObjectType({
    name: 'TaxonomyLabels',
    description: 'Human-readable labels for the resource for various contexts.',
    fields: () => ({
        ...taxonomyLabelFields,
    }),
});
