import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { Context, contextType } from '../../lib/abstract-types/';
import { StrongTypedFieldConfig } from '../../lib/strongTypes';
import revisionType, { Revision } from './revisionType';

export interface RevisionsArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
    /** The ID of the post. */
    id: number;
    /** The type of post. */
    postType?: 'posts'|'pages';
}
const revisions: StrongTypedFieldConfig<RevisionsArgs, any, any> = {
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
    resolve:
        (_root, { id, postType, ...args }: RevisionsArgs, context): PromiseLike<Revision[]> => (
            context.get(`/${postType}/${id}/revisions`, args)
        ),
};

export interface RevisionArgs extends RevisionsArgs {
    /** The ID of the post. */
    parentId: number;
}
const revision: StrongTypedFieldConfig<RevisionArgs, any, any> = {
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
    resolve:
        (_root, { id, postType, parentId, ...args }: RevisionArgs, context): PromiseLike<Revision> => (
            context.get(`/${postType}/${parentId}/revisions/${id}`, args)
        ),
};

export default {
    revisions,
    revision,
};
