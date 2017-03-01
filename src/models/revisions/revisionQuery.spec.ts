import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json', { auth: { username: 'root', password: 'root' } });

test('/posts/<id>/revisions (using default)', async t => {
    const expected = {
        revisions: [
            {
                author: 0,
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
                author: 0,
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
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getUTCMonth() + 1)).slice(-2);
    const expected = {
        revision: {
            content: {
                raw: 'Hello world!',
            },
            excerpt: {
                rendered: '',
            },
            guid: `http://localhost:8080/${year}/${month}/1-revision-v1`,
        },
    };
    const actual = await transport.send(`
        {
            revision(context: edit, parentId: 1, id: 3) {
                content {
                    raw
                }
                excerpt {
                    rendered
                }
                guid
            }
        }
    `);
    t.deepEqual(actual, expected);
});
