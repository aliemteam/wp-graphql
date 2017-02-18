import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json', { __INTERNAL_TESTING__: true });
let postId: number;
let revisionId: number;

test.before(async t => {
    let call = await transport.send(`
        mutation {
            addPost(title: "Test post for revisions", content: "Content") {
                id
            }
        }
    `);
    postId = call.addPost.id;
    await transport.send(`
        mutation U($id: Int!) {
            updatePost(id: $id, content: "Test content") {
                id
            }
        }
    `, { id: postId });
    call = await transport.send(`
        query Q($id: Int!) {
            revisions(id: $id) {
                parent
                id
            }
        }
    `, { id: postId });
    const { parent, id } = call.revisions[0];
    t.is(parent, postId);
    revisionId = id;
});

test('deleteRevision', async t => {
    const expected = {
        deleteRevision: {
            deleted: true,
            previous: {
                id: revisionId,
                title: 'Test post for revisions',
            },
        },
    };
    const actual = await transport.send(`
        mutation D($id: Int!, $parent: Int!) {
            deleteRevision(id: $id, parentId: $parent) {
                deleted
                previous {
                    id
                    title
                }
            }
        }
    `, { id: revisionId, parent: postId });
    t.deepEqual(actual, expected);
});
