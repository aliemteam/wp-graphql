import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json/wp/v2', { __INTERNAL_TESTING__: true });
let pageId: number;

test.serial('createPage', async t => {
    const expected = {
        createPage: {
            id: 0,
            title: 'Test New Page',
            content: {
                raw: 'Test page content.',
            },
            status: 'draft',
            parent: 0,
            menu_order: 0,
        },
    };
    const actual = await transport.send(`
        mutation {
            createPage(title: "Test New Page", content: "Test page content.") {
                id
                title
                content {
                    raw
                }
                status
                parent
                menu_order
            }
        }
    `);
    pageId = actual.createPage.id;
    expected.createPage.id = pageId;
    t.deepEqual(actual, expected);
});

test.serial('updatePage', async t => {
    const expected = {
        updatePage: {
            title: 'New page title',
        },
    };
    const data = {
        id: pageId,
        title: 'New page title',
    };
    const actual = await transport.send(`
        mutation UpdateSinglePage($id: Int!, $title: String!) {
            updatePage(id: $id, title: $title) {
                title
            }
        }
    `, data);
    t.deepEqual(actual, expected);
});

test.serial('deletePage', async t => {
    const expected = {
        deletePage: {
            deleted: true,
            previous: {
                id: pageId,
                title: 'New page title',
            },
        },
    };
    const data = { id: pageId };
    const actual = await transport.send(`
        mutation DeleteSinglePage($id: Int!) {
            deletePage(id: $id, force: true) {
                ... on DeletedPage {
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

test('createPage then deletePage (to trash)', async t => {
    const data = await transport.send(`
        mutation {
            createPage(title: "My Page", content: "My page content.") {
                id
            }
        }
    `);
    const { id } = data.createPage;
    const expected = {
        deletePage: {
            id,
            title: 'My Page',
            status: 'trash',
        },
    };
    const actual = await transport.send(`
        mutation DeletePage($id: Int!) {
            deletePage(id: $id) {
                ... on Page {
                    id
                    title
                    status
                }
            }
        }
    `, { id });
    t.deepEqual(actual, expected);
});
