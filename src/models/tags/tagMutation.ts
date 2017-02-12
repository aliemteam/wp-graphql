import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { ArgumentField } from '../../lib/strongTypes';
import deletedObjectFactory, { DeletedObject } from '../../lib/type-factories/deletedObjectFactory';
import tagType, { Tag } from './types/tagType';

export const deletedTagType: GraphQLObjectType = deletedObjectFactory(tagType);

export interface TagMutationOptions {
    /** HTML description of the term. */
    description?: string;
    /** Meta fields. */
    meta?: any[]; // FIXME:
    /** HTML title for the term. */
    name?: string;
    /** An alphanumeric identifier for the term unique to its type. */
    slug?: string;
}

export interface CreateTagArgs extends TagMutationOptions {
    /** HTML title for the term. */
    name: string;
}

const createTag: ArgumentField<CreateTagArgs, any, any> = {
    description: 'Create a new tag.',
    type: tagType,
    args: {
        description: {
            description: 'HTML description of the term. ',
            type: GraphQLString,
        },
        meta: {
            description: 'Meta fields.',
            type: new GraphQLList(GraphQLString),
        },
        name: {
            description: 'HTML title for the term.',
            type: new GraphQLNonNull(GraphQLString),
        },
        slug: {
            description: 'An alphanumeric identifier for the term unique to its type.',
            type: GraphQLString,
        },
    },
    resolve: (_root, args: CreateTagArgs, context): PromiseLike<Tag> => context.post('/tags', args),
};

export interface UpdateTagArgs extends TagMutationOptions {
    /** ID of the tag being updated. */
    id: number;
}

const updateTag: ArgumentField<UpdateTagArgs, any, any> = {
    description: 'Update a tag by ID.',
    type: tagType,
    args: {
        description: {
            description: 'HTML description of the term. ',
            type: GraphQLString,
        },
        id: {
            description: 'ID of the tag being updated.',
            type: new GraphQLNonNull(GraphQLInt),
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
    },
    resolve: (_root, { id, ...args }: UpdateTagArgs, context): PromiseLike<Tag> => (
        context.post(`/tags/${id}`, args)
    ),
};

export interface DeleteTagArgs {
    /** Set internally. Required to be true, as terms do not support trashing. */
    force?: true;
    /** ID of the tag being deleted. */
    id: number;
}

const deleteTag: ArgumentField<DeleteTagArgs, any, any> = {
    description: 'Delete a tag by ID.',
    type: deletedTagType,
    args: {
        force: {
            description: 'Set internally. Required to be true, as terms do not support trashing.',
            type: GraphQLBoolean,
            defaultValue: true,
        },
        id: {
            description: 'ID of the tag being deleted.',
            type: new GraphQLNonNull(GraphQLInt),
        },
    },
    resolve: (_root, { id, ...args }: DeleteTagArgs, context): PromiseLike<DeletedObject<Tag>> => (
        context.delete(`/tags/${id}`, args)
    ),
};

export default {
    createTag,
    updateTag,
    deleteTag,
};