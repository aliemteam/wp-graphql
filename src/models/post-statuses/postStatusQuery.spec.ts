import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json', { auth: { username: 'root', password: 'root' } });

test('/statuses with complex fragments', async t => {
    const expected = {
        postStatuses: {
            publish: {
                name: 'Published',
                slug: 'publish',
            },
            future: {
                name: 'Scheduled',
                slug: 'future',
            },
        },
    };
    const actual = await transport.send(`
        fragment statusFields on PostStatus {
            name
            slug
        }
        fragment statusKeys on PostStatusObject {
            publish {
                ...statusFields
            }
            future {
                ...statusFields
            }
        }
        {
            postStatuses {
                ...statusKeys
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/statuses/<status>', async t => {
    const expected = {
        postStatus: {
            name: 'Published',
            public: true,
        },
    };
    const actual = await transport.send(`
        {
            postStatus(status: publish) {
                name
                public
            }
        }
    `);
    t.deepEqual(actual, expected);
});
