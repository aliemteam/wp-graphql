import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json');

test('/tags with no arguments', async t => {
    const expected = {
        tags: [
            { name: 'Tag 10' },
            { name: 'Tag 11' },
            { name: 'Tag 2' },
            { name: 'Tag 3' },
            { name: 'Tag 4' },
            { name: 'Tag 5' },
            { name: 'Tag 6' },
            { name: 'Tag 7' },
            { name: 'Tag 8' },
            { name: 'Tag 9' },
        ],
    };
    const actual = await transport.send(`
        {
            tags {
                name
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/tags with assorted arguments', async t => {
    const expected = {
        tags: [
            { name: 'Tag 3' },
            { name: 'Tag 4' },
            { name: 'Tag 5' },
            { name: 'Tag 6' },
            { name: 'Tag 7' },
            { name: 'Tag 8' },
            { name: 'Tag 9' },
            { name: 'Tag 10' },
        ],
    };
    const actual = await transport.send(`
        {
            tags(exclude: [1, 2, 11], orderby: id, order: asc) {
                name
            }
        }
    `);
    actual.tags = actual.tags.filter(tag => tag.name !== 'Test Tag' && tag.name !== 'Testing Tag');
    t.deepEqual(actual, expected);
});

test('/tags/<id> with no arguments', async t => {
    const expected = {
        tag: {
            name: 'Tag 10',
            taxonomy: 'post_tag',
        },
    };
    const actual = await transport.send(`
        {
            tag(id: 10) {
                name
                taxonomy
            }
        }
    `);
    t.deepEqual(actual, expected);
});
