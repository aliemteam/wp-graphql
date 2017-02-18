import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json', { __INTERNAL_TESTING__: true });
let commentId: number;

test.serial('addComment', async t => {
    const expected = {
        addComment: {
            id: 0,
            status: 'approved',
            post: 1,
            parent: 0,
            content: {
                raw: 'Test comment content.',
            },
        },
    };
    const actual = await transport.send(`
        mutation {
            addComment(post: 1, content: "Test comment content.") {
                id
                status
                post
                parent
                content {
                    raw
                }
            }
        }
    `);
    commentId = actual.addComment.id;
    expected.addComment.id = commentId;
    t.deepEqual(actual, expected);
});

test.serial('updateComment', async t => {
    const expected = {
        updateComment: {
            id: commentId,
            status: 'spam',
            content: {
                raw: 'Test comment content.',
            },
        },
    };
    const actual = await transport.send(`
        mutation UpdateComment($id: Int!) {
            updateComment(id: $id, status: spam) {
                id
                status
                content {
                    raw
                }
            }
        }
    `, { id: commentId });
    t.deepEqual(actual, expected);
});

test.serial('deleteComment (to trash)', async t => {
    const expected = {
        deleteComment: {
            id: commentId,
            status: 'trash',
        },
    };
    const actual = await transport.send(`
        mutation DeleteComment($id: Int!) {
            deleteComment(id: $id) {
                ... on Comment {
                    id
                    status
                }
            }
        }
    `, { id: commentId });
    t.deepEqual(actual, expected);
});

test.serial('deleteComment (skip trash)', async t => {
    const expected = {
        deleteComment: {
            deleted: true,
            previous: {
                id: commentId,
                content: {
                    raw: 'Test comment content.',
                },
            },
        },
    };
    const actual = await transport.send(`
        mutation DeleteComment($id: Int!) {
            deleteComment(id: $id, force: true) {
                ... on DeletedComment {
                    deleted
                    previous {
                        id
                        content {
                            raw
                        }
                    }
                }
            }
        }
    `, { id: commentId });
    t.deepEqual(actual, expected);
});
