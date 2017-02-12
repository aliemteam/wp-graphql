import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json/wp/v2', { __INTERNAL_TESTING__: true });

test('comments query', async t => {
    const expected = {
        comments: [
            {
                id: 1,
                author_name: 'A WordPress Commenter',
                author_email: null,
                status: 'approved',
                author_url: 'https://wordpress.org/',
            },
        ],
    };
    const actual = await transport.send(`
        {
            comments(order: asc, per_page: 1) {
                id
                author_name
                author_email
                status
                author_url
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/comments with an assortment of arguments', async t => {
    const expected = {
        comments: [
            {
                id: 1,
                author_name: 'A WordPress Commenter',
                author_email: 'wapuu@wordpress.example',
                author_url: 'https://wordpress.org/',
                content: {
                    raw: 'Hi, this is a comment.\n' +
                        'To get started with moderating, editing, and deleting comments, ' +
                        'please visit the Comments screen in the dashboard.\n' +
                        'Commenter avatars come from <a href=\"https://gravatar.com\">Gravatar</a>.',
                },
            },
        ],
    };
    const actual = await transport.send(`
        {
            comments(context: edit, include: 1, exclude: [2, 54], search: "Hi, this is a comment") {
                id
                author_name
                author_email
                author_url
                content {
                    raw
                }
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/comments/<id>', async t => {
    const expected = {
        comment: {
            author_name: 'A WordPress Commenter',
            status: 'approved',
        },
    };
    const actual = await transport.send(`
        {
            comment(id: 1) {
                author_name
                status
            }
        }
    `);
    t.deepEqual(actual, expected);
});
