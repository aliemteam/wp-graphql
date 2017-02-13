import { GraphQLNonNull } from 'graphql';
import { Context, contextType } from '../../lib/abstract-types/';
import { namespace as NS } from '../../lib/constants';
import { ArgumentField } from '../../lib/strongTypes';
import {
    PostStatus,
    PostStatusObject,
    postStatusObjectType,
    postStatusType,
    SinglePostStatus,
    singlePostStatusType,
} from './types/postStatusType';

export interface PostStatusesArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
}

const postStatuses: ArgumentField<PostStatusesArgs> = {
    description: 'Fetch all post statuses.',
    type: postStatusObjectType,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
    },
    resolve: (root, args: PostStatusesArgs): PromiseLike<PostStatusObject> => (
        root.get(`/${NS}/statuses`, args)
    ),
};

export interface PostStatusArgs extends PostStatusesArgs {
    /** The post status being queried. */
    status: PostStatus;
}

const postStatus: ArgumentField<PostStatusArgs> = {
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
    resolve: (root, { status, ...args }: PostStatusArgs): PromiseLike<SinglePostStatus> => (
        root.get(`/${NS}/statuses/${status}`, args)
    ),
};

export default {
    postStatuses,
    postStatus,
};
