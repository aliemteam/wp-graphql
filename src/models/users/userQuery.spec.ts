import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://demo.wp-api.org/wp-json/wp/v2');

test('/users with no arguments', async t => {
    const expected = {
        users: [
            {
                id: 1,
                name: 'Human Made',
                slug: 'humanmade',
                avatar_urls: {
                    size24: 'http://2.gravatar.com/avatar/83888eb8aea456e4322577f96b4dbaab?s=24&d=mm&r=g',
                },
            },
            {
                id: 135,
                name: 'xxxxx',
                slug: 'xxxxx',
                avatar_urls: {
                    size24: 'http://1.gravatar.com/avatar/a2e1f0c1b55cba041ad89ef714d525b2?s=24&d=mm&r=g',
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
            name: 'Human Made',
            avatar_urls: {
                size48: 'http://2.gravatar.com/avatar/83888eb8aea456e4322577f96b4dbaab?s=48&d=mm&r=g',
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
