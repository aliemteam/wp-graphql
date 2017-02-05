import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('https://demo.wp-api.org/wp-json/wp/v2');

test('/types with no arguments', async t => {
    const expected = {
        postTypes: {
            post: {
                name: 'Posts',
                slug: 'post',
            },
        },
    };
    const actual = await transport.send(`
        {
            postTypes {
                post {
                    name
                    slug
                }
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/types with context argument', async t => {
    const expected = {
        postTypes: {
            page: {
                name: 'Pages',
                slug: 'page',
            },
        },
    };
    const actual = await transport.send(`
        {
            postTypes(context: view) {
                page {
                    name
                    slug
                }
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/types/<slug>', async t => {
    const expected = {
        postType: {
            name: 'Posts',
            slug: 'post',
        },
    };
    const actual = await transport.send(`
        {
            postType(slug: "post") {
                name
                slug
            }
        }
    `);
    t.deepEqual(actual, expected);
});
