import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json');

test('/categories', async t => {
    const expected = {
        categories: [
            {
                id: 1,
                name: 'Uncategorized',
            },
        ],
    };
    const actual = await transport.send(`
        {
            categories(order: asc, orderby: id, per_page: 1) {
                id
                name
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/categories/<id>', async t => {
    const expected = {
        category: {
            name: 'Uncategorized',
            taxonomy: 'category',
            parent: 0,
        },
    };
    const actual = await transport.send(`
        {
            category(id: 1) {
                name
                taxonomy
                parent
            }
        }
    `);
    t.deepEqual(actual, expected);
});
