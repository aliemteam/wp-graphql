import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json/wp/v2', { __INTERNAL_TESTING__: true });

test('/pages with no arguments', async t => {
    const expected = {
        pages: [
            { id: 2 },
        ],
    };
    const actual = await transport.send(`
        {
            pages {
                id
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/pages with several arguments', async t => {
    const expected = {
        pages: [
            { id: 2, slug: 'sample-page' },
        ],
    };
    const actual = await transport.send(`
        {
            pages(orderby: "id", per_page: 1, order: "asc") {
                id
                slug
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/pages/<id>', async t => {
    const expected = {
        page: {
            id: 2, slug: 'sample-page',
        },
    };
    const actual = await transport.send(`
        {
            page(id: 2) {
                id
                slug
            }
        }
    `);
    t.deepEqual(actual, expected);
});
