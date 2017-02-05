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
    add_new: { type: GraphQLString },
    add_new_item: { type: GraphQLString },
    all_items: { type: GraphQLString },
    archives: { type: GraphQLString },
    attributes: { type: GraphQLString },
    edit_item: { type: GraphQLString },
    featured_image: { type: GraphQLString },
    filter_items_list: { type: GraphQLString },
    insert_into_item: { type: GraphQLString },
    items_list: { type: GraphQLString },
    items_list_navigation: { type: GraphQLString },
    menu_name: { type: GraphQLString },
    name: { type: GraphQLString },
    name_admin_bar: { type: GraphQLString },
    new_item: { type: GraphQLString },
    not_found: { type: GraphQLString },
    not_found_in_trash: { type: GraphQLString },
    parent_item_colon: { type: GraphQLString },
    remove_featured_image: { type: GraphQLString },
    search_items: { type: GraphQLString },
    set_featured_image: { type: GraphQLString },
    singular_name: { type: GraphQLString },
    uploaded_to_this_item: { type: GraphQLString },
    use_featured_image: { type: GraphQLString },
    view_item: { type: GraphQLString },
    view_items: { type: GraphQLString },
};

export const postLabelsType = new GraphQLObjectType({
    name: 'PostLabels',
    description: 'Human-readable labels for the resource for various contexts.',
    fields: () => ({
        ...postLabelsFields,
    }),
});
