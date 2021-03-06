import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json');

test('/media with several sort arguments', async t => {
    const expected = {
        mediaList: [
            {
                id: 4,
                slug: 'test-image',
                type: 'attachment',
                mime_type: 'image/png',
            },
            {
                id: 5,
                slug: 'test-pdf',
                type: 'attachment',
                mime_type: 'application/pdf',
            },
        ],
    };
    const actual = await transport.send(`
        {
            mediaList(orderby: id, order: asc, per_page: 2) {
                id
                slug
                type
                mime_type
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/media with several arguments', async t => {
    const expected = {
        mediaList: [
            {
                id: 4,
                title: {
                    rendered: 'Test Image',
                },
                media_details: {
                    width: 303,
                    height: 53,
                    sizes: [
                        {
                            width: 150,
                        },
                        {
                            width: 300,
                        },
                        {
                            width: 100,
                        },
                        {
                            width: 303,
                        },
                    ],
                },
            },
        ],
    };
    const actual = await transport.send(`
        {
            mediaList(media_type: image, orderby: id, page: 1, status: inherit) {
                id
                title {
                    rendered
                }
                media_details {
                    width
                    height
                    sizes {
                        width
                    }
                }
            }
        }
    `);
    t.deepEqual(actual, expected);
});

test('/media/<id>', async t => {
    const expected = {
        media: {
            title: {
                rendered: 'Test Image',
            },
            media_type: 'image',
            media_details: {
                image_meta: {
                    aperture: '0',
                    focal_length: '0',
                },
            },
        },
    };
    const actual = await transport.send(`
        {
            media(id: 4) {
                title {
                    rendered
                }
                media_type
                media_details {
                    image_meta {
                        aperture
                        focal_length
                    }
                }
            }
        }
    `);
    t.deepEqual(actual, expected);
});
