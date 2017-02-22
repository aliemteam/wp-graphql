import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json', { __INTERNAL_TESTING__: true });

test('users query', async t => {
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
            users(orderby: id, order: asc, per_page: 1) {
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
                size96: 'http://2.gravatar.com/avatar/2cfab1d357956161ae033fe8c3605541?s=96&d=mm&r=g',
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
                    size96
                }
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/user/<id> with "edit" context', async t => {
    const expected = {
        user: {
            name: 'root',
            capabilities: [
                'switch_themes',
                'edit_themes',
                'activate_plugins',
                'edit_plugins',
                'edit_users',
                'edit_files',
                'manage_options',
                'moderate_comments',
                'manage_categories',
                'manage_links',
                'upload_files',
                'import',
                'unfiltered_html',
                'edit_posts',
                'edit_others_posts',
                'edit_published_posts',
                'publish_posts',
                'edit_pages',
                'read',
                'level_10',
                'level_9',
                'level_8',
                'level_7',
                'level_6',
                'level_5',
                'level_4',
                'level_3',
                'level_2',
                'level_1',
                'level_0',
                'edit_others_pages',
                'edit_published_pages',
                'publish_pages',
                'delete_pages',
                'delete_others_pages',
                'delete_published_pages',
                'delete_posts',
                'delete_others_posts',
                'delete_published_posts',
                'delete_private_posts',
                'edit_private_posts',
                'read_private_posts',
                'delete_private_pages',
                'edit_private_pages',
                'read_private_pages',
                'delete_users',
                'create_users',
                'unfiltered_upload',
                'edit_dashboard',
                'update_plugins',
                'delete_plugins',
                'install_plugins',
                'update_themes',
                'install_themes',
                'update_core',
                'list_users',
                'remove_users',
                'promote_users',
                'edit_theme_options',
                'delete_themes',
                'export',
                'administrator',
            ],
            extra_capabilities: [
                'administrator',
            ],
        },
    };
    const actual = await transport.send(`
        {
            user(id: 1, context: edit) {
                name
                capabilities
                extra_capabilities
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/users/me', async t => {
    const expected = {
        me: {
            id: 1,
            name: 'root',
            email: null,
        },
        editContext: {
            id: 1,
            name: 'root',
            email: 'admin@wordpress.com',
        },
    };
    const actual = await transport.send(`
        {
            me(context: view) {
                id
                name
                email
            }
            editContext: me {
                id
                name
                email
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('batched queries with "extract"', async t => {
    const expected = {
        extract: {
            id: 1,
            name: 'root',
            email: 'admin@wordpress.com',
        },
        user: {
            name: 'root',
        },
    };
    const actual = await transport.batch(`
        query firstQuery {
            extract: me {
                id
                name
                email
            }
        }
        query secondQuery($id: Int!) {
            user(id: $id) {
                name
            }
        }
    `, ['firstQuery', 'secondQuery']);
    t.deepEqual(actual, expected);
});

test('batched queries without "extract", but with variables', async t => {
    const expected = {
        me: {
            name: 'root',
        },
        user: {
            name: 'root',
        },
    };
    const actual = await transport.batch(`
        query secondQuery($id: Int!) {
            user(id: $id) {
                name
            }
        }
        query firstQuery {
            me {
                name
            }
        }
    `, ['firstQuery', 'secondQuery'], { id: 1 });
    t.deepEqual(actual, expected);
});

test('batched queries with "extract" and defined variables', async t => {
    const expected = {
        extract: {
            id: 1,
        },
        user: {
            name: 'root',
        },
        user2: {
            name: 'root',
        },
    };
    const actual = await transport.batch(`
        query secondQuery($id: Int!, $myId: Int!) {
            user(id: $id) {
                name
            }
            user2: user(id: $myId) {
                name
            }
        }
        query firstQuery($myId: Int!) {
            extract: user(id: $myId) {
                id
            }
        }
    `, ['firstQuery', 'secondQuery'], { myId: 1 });
    t.deepEqual(actual, expected);
});
