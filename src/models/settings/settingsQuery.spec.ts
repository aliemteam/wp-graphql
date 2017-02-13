import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json', { __INTERNAL_TESTING__: true });

test('/settings', async t => {
    const expected = {
        settings: {
            title: 'wordpress',
            description: 'Just another WordPress site',
            use_smilies: true,
            posts_per_page: 10,
        },
    };
    const actual = await transport.send(`
        {
            settings {
                title
                description
                use_smilies
                posts_per_page
            }
        }
    `);
    t.deepEqual(actual, expected);
});
