import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('https://demo.wp-api.org/wp-json/wp/v2');

test('/posts with no arguments', async t => {
    const expected = {
        posts: [
            { id: 470 },
            { id: 469 },
            { id: 457 },
            { id: 455 },
            { id: 454 },
            { id: 453 },
            { id: 452 },
            { id: 450 },
            { id: 449 },
            { id: 448 },
        ],
    };
    const actual = await transport.send(`
        {
            posts {
                id
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/posts with several arguments', async t => {
    const expected = {
        posts: [
            { id: 1, slug: 'hello-world', title: 'Hello world!' },
        ],
    };
    const actual = await transport.send(`
        {
            posts(orderby: "id", order: "asc", per_page: 1) {
                id
                slug
                title
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/post/<id> with no arguments', async t => {
    const expected = {
        post: {
            id: 1,
            slug: 'hello-world',
        },
    };
    const actual = await transport.send(`
        {
            post(id: 1) {
                id
                slug
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/post/<id> with 1 argument', async t => {
    const expected = {
        post: {
            id: 1,
            slug: 'hello-world',
        },
    };
    const actual = await transport.send(`
        {
            post(id: 1, context: view) {
                id
                slug
            }
        }
    `);
    t.deepEqual(actual, expected);
});
