import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { StrongTypedFieldConfig } from '../../lib/strongTypes';
import revisionType, { Revision } from './revisionType';

export interface RevisionsArgs {
    context?: 'view'|'edit'|'embed';
    id: number;
    postType?: 'posts'|'pages';
}
const revisions: StrongTypedFieldConfig<RevisionsArgs, any, any> = {
    description: 'List all revisions for an individual post.',
    type: new GraphQLList(revisionType),
    args: {
        context: {
            type: GraphQLString,
        },
        id: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        postType: {
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
    parentId: number;
}
const revision: StrongTypedFieldConfig<RevisionArgs, any, any> = {
    description: 'Get a single post revision.',
    type: revisionType,
    args: {
        context: {
            type: GraphQLString,
        },
        id: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        postType: {
            type: GraphQLString,
            defaultValue: 'posts',
        },
        parentId: {
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
