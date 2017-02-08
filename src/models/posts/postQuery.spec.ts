import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json/wp/v2', { __INTERNAL_TESTING__: true });

test('/posts with no arguments', async t => {
    const expected = {
        posts: [
            { id: 1, guid: 'http://localhost:8080/?p=1' },
        ],
    };
    const actual = await transport.send(`
        {
            posts {
                id
                guid
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
            posts(orderby: id, order: asc, per_page: 1, status: [pending, publish]) {
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
