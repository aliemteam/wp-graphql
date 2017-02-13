import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json', { __INTERNAL_TESTING__: true });

test('updateSettings', async t => {
    const expected = {
        updateSettings: {
            default_comment_status: 'open',
            start_of_week: 0,
            use_smilies: true,
        },
    };
    const actual = await transport.send(`
        mutation {
            updateSettings(default_comment_status: open, start_of_week: sun, use_smilies: true) {
                default_comment_status
                start_of_week
                use_smilies
            }
        }
    `);
    t.deepEqual(actual, expected);
});
