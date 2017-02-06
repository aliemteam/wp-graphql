import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json/wp/v2', { __INTERNAL_TESTING__: true });

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

test('/types/<slug> with "edit" context', async t => {
    const expected = {
        postType: {
            capabilities: [
                'edit_post',
                'read_post',
                'delete_post',
                'edit_posts',
                'edit_others_posts',
                'publish_posts',
                'read_private_posts',
                'read',
                'delete_posts',
                'delete_private_posts',
                'delete_published_posts',
                'delete_others_posts',
                'edit_private_posts',
                'edit_published_posts',
                'create_posts',
            ],
        },
    };
    const actual = await transport.send(`
        {
            postType(slug: "post", context: edit) {
                capabilities
            }
        }
    `);
    t.deepEqual(actual, expected);
});
