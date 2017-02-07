import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json/wp/v2', { __INTERNAL_TESTING__: true });

test('/taxonomies with no arguments', async t => {
    const expected = {
        taxonomies: [
            {
                slug: 'category',
                name: 'Categories',
            },
            {
                slug: 'post_tag',
                name: 'Tags',
            },
        ],
    };
    const actual = await transport.send(`
        {
            taxonomies {
                slug
                name
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/taxonomies with "edit" context', async t => {
    const expected = {
        taxonomies: [
            { labels: { search_items: 'Search Categories' } },
            { labels: { search_items: 'Search Tags' } },
        ],
    };
    const actual = await transport.send(`
        {
            taxonomies(context: edit) {
                labels {
                    search_items
                }
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/taxonomies/<slug> with edit context', async t => {
    const expected = {
        taxonomy: {
            capabilities: {
                manage_terms: 'manage_categories',
            },
        },
    };
    const actual = await transport.send(`
        {
            taxonomy(slug: "category", context: edit) {
                capabilities {
                    manage_terms
                }
            }
        }
    `);
    t.deepEqual(actual, expected);
});
