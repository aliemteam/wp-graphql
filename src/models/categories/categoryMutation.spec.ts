import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json/', { __INTERNAL_TESTING__: true });
let categoryId: number;

test.serial('addCategory', async t => {
    const expected = {
        addCategory: {
            id: 0,
            name: 'Test Category',
            taxonomy: 'category',
        },
    };
    const actual = await transport.send(`
        mutation {
            addCategory(name: "Test Category") {
                id
                name
                taxonomy
            }
        }
    `);
    categoryId = actual.addCategory.id;
    expected.addCategory.id = categoryId;
    t.deepEqual(actual, expected);
});

test.serial('updateCategory', async t => {
    const expected = {
        updateCategory: {
            id: categoryId,
            name: 'Testing Category',
            slug: 'foo-bar-baz',
        },
    };
    const actual = await transport.send(`
        mutation U($id: Int!) {
            updateCategory(id: $id, name: "Testing Category", slug: "foo-bar-baz") {
                id
                name
                slug
            }
        }
    `, { id: categoryId });
    t.deepEqual(actual, expected);
});

test.serial('deleteCategory', async t => {
    const expected = {
        deleteCategory: {
            deleted: true,
            previous: {
                id: categoryId,
                name: 'Testing Category',
            },
        },
    };
    const actual = await transport.send(`
        mutation D($id: Int!) {
            deleteCategory(id: $id) {
                deleted
                previous {
                    id
                    name
                }
            }
        }
    `, { id: categoryId });
    t.deepEqual(actual, expected);
});
