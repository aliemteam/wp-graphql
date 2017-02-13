import test from 'ava';
import WPGraphQL from '../../index';

declare const Buffer;

const transport = new WPGraphQL('http://localhost:8080/wp-json', { __INTERNAL_TESTING__: true });
let file: File|Blob;
let mediaId: number;

test.before(_t => {
    file = Buffer.from('hello world');
});

test.serial('addMedia', async t => {
    const expected = {
        addMedia: {
            id: 0,
            title: {
                raw: 'Testing new title',
            },
            media_type: 'file',
            mime_type: 'text/plain',
        },
    };
    const actual = await transport.send(`
        mutation UploadFile($file: String!, $filename: String!) {
            addMedia(file: $file, filename: $filename, title: "Testing new title") {
                id
                title {
                    raw
                }
                media_type
                mime_type
            }
        }
    `, { file, filename: 'hello-world.txt'});
    mediaId = actual.addMedia.id;
    expected.addMedia.id = mediaId;
    t.deepEqual(actual, expected);
});

test.serial('updateMedia', async t => {
    const expected = {
        updateMedia: {
            id: mediaId,
            title: {
                raw: 'Updated title in updateMedia',
            },
        },
    };
    const actual = await transport.send(`
        mutation U($id: Int!){
            updateMedia(id: $id, title: "Updated title in updateMedia") {
                id
                title {
                    raw
                }
            }
        }
    `, { id: mediaId });
    t.deepEqual(actual, expected);
});

test.serial('deleteMedia', async t => {
    const expected = {
        deleteMedia: {
            deleted: true,
            previous: {
                id: mediaId,
                title: {
                    raw: 'Updated title in updateMedia',
                },
            },
        },
    };
    const actual = await transport.send(`
        mutation D($id: Int!) {
            deleteMedia(id: $id) {
                deleted
                previous {
                    id
                    title {
                        raw
                    }
                }
            }
        }
    `, { id: mediaId });
    t.deepEqual(actual, expected);
});
