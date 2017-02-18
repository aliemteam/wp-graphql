import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json', { __INTERNAL_TESTING__: true });
let postId: number;

test.serial('addPost', async t => {
    const expected = {
        addPost: {
            id: 0,
            title: 'Test New Post',
            content: {
                raw: 'Test post content.',
            },
            status: 'draft',
        },
    };
    const actual = await transport.send(`
        mutation {
            addPost(title: "Test New Post", content: "Test post content.") {
                id
                title
                content {
                    raw
                }
                status
            }
        }
    `);
    postId = actual.addPost.id;
    expected.addPost.id = postId;
    t.deepEqual(actual, expected);
});

test.serial('updatePost', async t => {
    const expected = {
        updatePost: {
            title: 'New post title',
        },
    };
    const data = {
        id: postId,
        title: 'New post title',
    };
    const actual = await transport.send(`
        mutation UpdateSinglePost($id: Int!, $title: String!) {
            updatePost(id: $id, title: $title) {
                title
            }
        }
    `, data);
    t.deepEqual(actual, expected);
});

test.serial('deletePost', async t => {
    const expected = {
        deletePost: {
            deleted: true,
            previous: {
                id: postId,
                title: 'New post title',
            },
        },
    };
    const data = { id: postId };
    const actual = await transport.send(`
        mutation DeleteSinglePost($id: Int!) {
            deletePost(id: $id, force: true) {
                ... on DeletedPost {
                    deleted
                    previous {
                        id
                        title
                    }
                }
            }
        }
    `, data);
    t.deepEqual(actual, expected);
});

test('createPost then deletePost (to trash)', async t => {
    const data = await transport.send(`
        mutation {
            createPost(title: "My Post", content: "My post content.") {
                id
            }
        }
    `);
    const { id } = data.createPost;
    const expected = {
        deletePost: {
            id,
            title: 'My Post',
            status: 'trash',
        },
    };
    const actual = await transport.send(`
        mutation DeletePost($id: Int!) {
            deletePost(id: $id) {
                ... on Post {
                    id
                    title
                    status
                }
            }
        }
    `, { id });
    t.deepEqual(actual, expected);
});
