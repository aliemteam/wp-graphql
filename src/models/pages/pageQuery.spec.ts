import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://demo.wp-api.org/wp-json/wp/v2');

test('/pages with no arguments', async t => {
    const expected = {
        pages: [
            { id: 286 },
            { id: 347 },
            { id: 236 },
            { id: 308 },
            { id: 274 },
            { id: 219 },
            { id: 201 },
            { id: 251 },
            { id: 292 },
            { id: 265 },
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
