import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json/wp/v2', { __INTERNAL_TESTING__: true });

test('/posts/<id>/revisions (using default)', async t => {
    const expected = {
        revisions: [
            {
                author: '0',
                title: 'Hello world!',
            },
        ],
    };
    const actual = await transport.send(`
        {
            revisions(id: 1) {
                author
                title
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/posts/<id>/revisions (without default)', async t => {
    const expected = {
        revisions: [
            {
                author: '0',
                title: 'Hello world!',
            },
        ],
    };
    const actual = await transport.send(`
        {
            revisions(id: 1, postType: "posts") {
                author
                title
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/posts/<parentId>/revisions/<id> (using default)', async t => {
    const expected = {
        revision: {
            author: '0',
            title: 'Hello world!',
        },
    };
    const actual = await transport.send(`
        {
            revision(parentId: 1, id: 3) {
                author
                title
            }
        }
    `);
    t.deepEqual(actual, expected);
});
