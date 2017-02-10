import { GraphQLNonNull } from 'graphql';
import { Context, contextType } from '../../lib/abstract-types/';
import { ArgumentField } from '../../lib/strongTypes';
import {
    PostStatus,
    PostStatusObject,
    postStatusObjectType,
    postStatusType,
    SinglePostStatus,
    singlePostStatusType,
} from './postStatusType';

export interface PostStatusesArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
}

const postStatuses: ArgumentField<PostStatusesArgs, any, any> = {
    description: 'Fetch all post statuses.',
    type: postStatusObjectType,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
    },
    resolve: (_root, args: PostStatusesArgs, context): PromiseLike<PostStatusObject> => context.get('/statuses', args),
};

export interface PostStatusArgs extends PostStatusesArgs {
    /** The post status being queried. */
    status: PostStatus;
}

const postStatus: ArgumentField<PostStatusArgs, any, any> = {
    description: 'Fetch a single post status.',
    type: singlePostStatusType,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        status: {
            description: 'The post status being queried.',
            type: new GraphQLNonNull(postStatusType),
        },
    },
    resolve: (_root, { status, ...args }: PostStatusArgs, context): PromiseLike<SinglePostStatus> => (
        context.get(`/statuses/${status}`, args)
    ),
};

export default {
    postStatuses,
    postStatus,
};
