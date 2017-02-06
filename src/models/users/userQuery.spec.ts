import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json/wp/v2', { __INTERNAL_TESTING__: true });

test('/users with no arguments', async t => {
    const expected = {
        users: [
            {
                id: 1,
                name: 'root',
                slug: 'root',
                avatar_urls: {
                    size24: 'http://2.gravatar.com/avatar/2cfab1d357956161ae033fe8c3605541?s=24&d=mm&r=g',
                },
            },
        ],
    };
    const actual = await transport.send(`
        {
            users {
                id
                name
                slug
                avatar_urls {
                    size24
                }
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/user/<id>', async t => {
    const expected = {
        user: {
            id: 1,
            name: 'root',
            avatar_urls: {
                size48: 'http://2.gravatar.com/avatar/2cfab1d357956161ae033fe8c3605541?s=48&d=mm&r=g',
            },
        },
    };
    const actual = await transport.send(`
        {
            user(id: 1) {
                id
                name
                avatar_urls {
                    size48
                }
            }
        }
    `);
    t.deepEqual(actual, expected);
});
