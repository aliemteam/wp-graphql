import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { Context, contextType } from '../../lib/abstract-types/';
import { namespace as NS } from '../../lib/constants';
import { ArgumentField } from '../../lib/strongTypes';
import revisionType, { Revision } from './types/revisionType';

export interface RevisionsArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
    /** The ID of the post. */
    id: number;
    /** The type of post. */
    postType?: string;
}
const revisions: ArgumentField<RevisionsArgs> = {
    description: 'List all revisions for an individual post.',
    type: new GraphQLList(revisionType),
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        id: {
            description: 'The ID of the post.',
            type: new GraphQLNonNull(GraphQLInt),
        },
        postType: {
            description: 'The type of post.',
            type: GraphQLString,
            defaultValue: 'posts',
        },
    },
    resolve: (root, { id, postType, ...args }: RevisionsArgs): PromiseLike<Revision[]> => (
        root.get(`/${NS}/${postType}/${id}/revisions`, args)
    ),
};

export interface RevisionArgs extends RevisionsArgs {
    /** The ID of the post. */
    parentId: number;
}
const revision: ArgumentField<RevisionArgs> = {
    description: 'Get a single post revision.',
    type: revisionType,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        id: {
            description: 'The ID of the revision.',
            type: new GraphQLNonNull(GraphQLInt),
        },
        postType: {
            description: 'The type of post.',
            type: GraphQLString,
            defaultValue: 'posts',
        },
        parentId: {
            description: 'The ID of the post.',
            type: new GraphQLNonNull(GraphQLInt),
        },
    },
    resolve: (root, { id, postType, parentId, ...args }: RevisionArgs): PromiseLike<Revision> => (
        root.get(`/${NS}/${postType}/${parentId}/revisions/${id}`, args)
    ),
};

export default {
    revisions,
    revision,
};
