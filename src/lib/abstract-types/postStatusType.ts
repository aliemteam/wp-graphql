import { GraphQLEnumType } from 'graphql';

export type PostStatus =
    ('draft'|'future'|'pending'|'private'|'publish')
    | Array<'draft'|'future'|'pending'|'private'|'publish'>;

export const postStatus = new GraphQLEnumType({
    name: 'PostStatus',
    description: 'Publication status of the post.',
    values: {
        draft: { value: 'draft' },
        future: { value: 'future' },
        pending: { value: 'pending' },
        private: { value: 'private' },
        publish: { value: 'publish' },
    },
});
