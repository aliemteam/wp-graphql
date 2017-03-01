import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json', { auth: { username: 'root', password: 'root' } });
let pageId: number;

test.serial('addPage', async t => {
    const expected = {
        addPage: {
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
            addPage(title: "Test New Page", content: "Test page content.") {
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
    pageId = actual.addPage.id;
    expected.addPage.id = pageId;
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

test('addPage then deletePage (to trash)', async t => {
    const data = await transport.send(`
        mutation {
            addPage(title: "My Page", content: "My page content.") {
                id
            }
        }
    `);
    const { id } = data.addPage;
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
