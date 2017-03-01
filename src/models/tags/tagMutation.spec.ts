import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json', { auth: { username: 'root', password: 'root' } });
let tagId: number;

test.serial('addTag', async t => {
    const expected = {
        addTag: {
            id: tagId,
            name: 'Test Tag',
            taxonomy: 'post_tag',
        },
    };
    const actual = await transport.send(`
        mutation {
            addTag(name: "Test Tag") {
                id
                name
                taxonomy
            }
        }
    `);
    tagId = actual.addTag.id;
    expected.addTag.id = tagId;
    t.deepEqual(actual, expected);
});

test.serial('updateTag', async t => {
    const expected = {
        updateTag: {
            id: tagId,
            name: 'Testing Tag',
        },
    };
    const actual = await transport.send(`
        mutation U($id: Int!) {
            updateTag(id: $id, name: "Testing Tag") {
                id
                name
            }
        }
    `, { id: tagId });
    t.deepEqual(actual, expected);
});

test.serial('deleteTag', async t => {
    const expected = {
        deleteTag: {
            deleted: true,
            previous: {
                id: tagId,
                name: 'Testing Tag',
            },
        },
    };
    const actual = await transport.send(`
        mutation D($id: Int!) {
            deleteTag(id: $id) {
                deleted
                previous {
                    id
                    name
                }
            }
        }
    `, { id: tagId });
    t.deepEqual(actual, expected);
});
