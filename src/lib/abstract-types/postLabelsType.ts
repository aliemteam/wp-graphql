import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { TypedFields } from '../strongTypes';

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

const postLabelsFields: TypedFields<PostLabels, PostLabels, {}> = {
    add_new: {
        description: 'Label for "Add New" field.',
        type: GraphQLString,
    },
    add_new_item: {
        description: 'Label for "Add New Item" field.',
        type: GraphQLString,
    },
    all_items: {
        description: 'Label for "All Items" field.',
        type: GraphQLString,
    },
    archives: {
        description: 'Label for "Archives" field.',
        type: GraphQLString,
    },
    attributes: {
        description: 'Label for "Attributes" field.',
        type: GraphQLString,
    },
    edit_item: {
        description: 'Label for "Edit Item" field.',
        type: GraphQLString,
    },
    featured_image: {
        description: 'Label for "Featured Image" field.',
        type: GraphQLString,
    },
    filter_items_list: {
        description: 'Label for "Filter Items List" field.',
        type: GraphQLString,
    },
    insert_into_item: {
        description: 'Label for "Insert Into Item" field.',
        type: GraphQLString,
    },
    items_list: {
        description: 'Label for "Items List" field.',
        type: GraphQLString,
    },
    items_list_navigation: {
        description: 'Label for "Items List Navigation" field.',
        type: GraphQLString,
    },
    menu_name: {
        description: 'Label for "Menu Name" field.',
        type: GraphQLString,
    },
    name: {
        description: 'Label for "Name" field.',
        type: GraphQLString,
    },
    name_admin_bar: {
        description: 'Label for "Name Admin Bar" field.',
        type: GraphQLString,
    },
    new_item: {
        description: 'Label for "New Item" field.',
        type: GraphQLString,
    },
    not_found: {
        description: 'Label for "Not Found" field.',
        type: GraphQLString,
    },
    not_found_in_trash: {
        description: 'Label for "Not Found in Trash" field.',
        type: GraphQLString,
    },
    parent_item_colon: {
        description: 'Label for "Parent Item Colon" field.',
        type: GraphQLString,
    },
    remove_featured_image: {
        description: 'Label for "Remove Featured Image" field.',
        type: GraphQLString,
    },
    search_items: {
        description: 'Label for "Search Items" field.',
        type: GraphQLString,
    },
    set_featured_image: {
        description: 'Label for "Set Featured Image" field.',
        type: GraphQLString,
    },
    singular_name: {
        description: 'Label for "Singular Name" field.',
        type: GraphQLString,
    },
    uploaded_to_this_item: {
        description: 'Label for "Upload to this Item" field.',
        type: GraphQLString,
    },
    use_featured_image: {
        description: 'Label for "Use Featured Image" field.',
        type: GraphQLString,
    },
    view_item: {
        description: 'Label for "View Item" field.',
        type: GraphQLString,
    },
    view_items: {
        description: 'Label for "View Items" field.',
        type: GraphQLString,
    },
};

export const postLabelsType = new GraphQLObjectType({
    name: 'PostLabels',
    description: 'Human-readable labels for the resource for various contexts.',
    fields: () => ({
        ...postLabelsFields,
    }),
});
