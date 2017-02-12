import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { ArgumentField } from '../../lib/strongTypes';
import deletedObjectFactory, { DeletedObject } from '../../lib/type-factories/deletedObjectFactory';
import revisionType, { Revision } from './types/revisionType';

export const deletedRevisionType: GraphQLObjectType = deletedObjectFactory(revisionType);

export interface DeleteRevisionArgs {
    /** Set internally. Must be true for request to complete. */
    force: true;
    /** ID of the revision being deleted. */
    id: number;
    /** ID of the revisions parent. */
    parentId: number;
    /** Pluralized form of the revision's parent type. */
    parentType: 'posts'|'pages';
}

const deleteRevision: ArgumentField<DeleteRevisionArgs, any, any> = {
    description: 'Delete a revision.',
    type: deletedRevisionType,
    args: {
        force: {
            description: 'Set internally. Must be true for request to complete.',
            type: GraphQLBoolean,
            defaultValue: true,
        },
        id: {
            description: 'ID of the revision being deleted.',
            type: new GraphQLNonNull(GraphQLInt),
        },
        parentId: {
            description: 'ID of the revisions parent.',
            type: new GraphQLNonNull(GraphQLInt),
        },
        parentType: {
            description: 'Pluralized form of the revision\'s parent type.',
            type: GraphQLString,
            defaultValue: 'posts',
        },
    },
    resolve: (_root, { id, parentId, parentType, ...args }, context): PromiseLike<DeletedObject<Revision>> => (
        context.delete(`/${parentType}/${parentId}/revisions/${id}`, args)
    ),
};

export default {
    deleteRevision,
};