import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { namespace as NS } from '../../lib/constants';
import { ArgumentField } from '../../lib/strongTypes';
import deletedObjectFactory, { DeletedObject } from '../../lib/type-factories/deletedObjectFactory';
import categoryType, { Category } from './types/categoryType';

export const deletedCategoryType: GraphQLObjectType = deletedObjectFactory(categoryType);

export interface CategoryMutationOptions {
    /** HTML description of the term. */
    description?: string;
    /** Meta fields. */
    meta?: any[];
    /** HTML title for the term. */
    name?: string;
    /** The parent term ID. */
    parent?: number;
    /** An alphanumeric identifier for the term unique to its type. */
    slug?: string;
}

export interface AddCategoryArgs extends CategoryMutationOptions {
    /** HTML title for the term. */
    name: string;
}

const addCategory: ArgumentField<AddCategoryArgs> = {
    description: 'Create a new category.',
    type: categoryType,
    args: {
        description: {
            description: 'HTML description of the term.',
            type: GraphQLString,
        },
        meta: {
            description: 'Meta fields.',
            type: new GraphQLList(GraphQLString), // FIXME:
        },
        name: {
            description: 'HTML title for the term.',
            type: new GraphQLNonNull(GraphQLString),
        },
        parent: {
            description: 'The parent term ID.',
            type: GraphQLInt,
        },
        slug: {
            description: 'An alphanumeric identifier for the term unique to its type.',
            type: GraphQLString,
        },
    },
    resolve: (root, args: AddCategoryArgs): PromiseLike<Category> => (
        root.post(`/${NS}/categories`, args)
    ),
};

export interface UpdateCategoryArgs extends CategoryMutationOptions {
    /** ID of the category being updated. */
    id: number;
}

const updateCategory: ArgumentField<UpdateCategoryArgs> = {
    description: 'Update a category by ID.',
    type: categoryType,
    args: {
        description: {
            description: 'HTML description of the term.',
            type: GraphQLString,
        },
        id: {
            description: 'ID of the category being updated.',
            type: new GraphQLNonNull(GraphQLInt),
        },
        meta: {
            description: 'Meta fields.',
            type: new GraphQLList(GraphQLString), // FIXME:
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
    },
    resolve: (root, { id, ...args }: UpdateCategoryArgs): PromiseLike<Category> => (
        root.post(`/${NS}/categories/${id}`, args)
    ),
};

export interface DeleteCategoryArgs {
    /** Set internally. Required to be true, as terms do not support trashing. */
    force?: true;
    /** The ID of the category being deleted. */
    id: number;
}

const deleteCategory: ArgumentField<DeleteCategoryArgs> = {
    description: 'Delete a category by ID.',
    type: deletedCategoryType,
    args: {
        force: {
            description: 'Set internally. Required to be true, as terms do not support trashing.',
            type: GraphQLBoolean,
            defaultValue: true,
        },
        id: {
            description: 'The ID of the category being deleted.',
            type: new GraphQLNonNull(GraphQLInt),
        },
    },
    resolve: (root, { id, ...args }: DeleteCategoryArgs): PromiseLike<DeletedObject<Category>> => (
        root.delete(`/${NS}/categories/${id}`, args)
    ),
};

export default {
    addCategory,
    updateCategory,
    deleteCategory,
};
