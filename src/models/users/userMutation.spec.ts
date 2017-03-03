import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json', { auth: { username: 'root', password: 'root' } });
let userId: number;

test.serial('addUser', async t => {
    const expected = {
        addUser: {
            id: 0,
            username: 'foo',
            name: 'foo',
            first_name: '',
        },
    };
    const data = {
        email: 'foo@bar.com',
        pass: 'password',
        username: 'foo',
    };
    const actual = await transport.send(`
        mutation AddNewUser($email: String!, $pass: String!, $username: String!) {
            addUser(email: $email, password: $pass, username: $username) {
                id
                username
                name
                first_name
            }
        }
    `, data);
    userId = actual.addUser.id;
    expected.addUser.id = userId;
    t.deepEqual(actual, expected);
});

test.serial('updateUser', async t => {
    const expected = {
        updateUser: {
            first_name: 'John',
            last_name: 'Doe',
        },
    };
    const data = {
        id: userId,
        fn: 'John',
        ln: 'Doe',
    };
    const actual = await transport.send(`
        mutation UpdateAUser($fn: String, $ln: String, $id: Int!) {
            updateUser(id: $id, first_name: $fn, last_name: $ln) {
                first_name
                last_name
            }
        }
    `, data);
    t.deepEqual(actual, expected);
});

test.serial('deleteUser', async t => {
    const expected = {
        deleteUser: {
            deleted: true,
            previous: {
                id: userId,
                first_name: 'John',
                last_name: 'Doe',
            },
        },
    };
    const data = { id: userId };
    const actual = await transport.send(`
        mutation DeleteSingleUser($id: Int!) {
            deleteUser(id: $id) {
                deleted
                previous {
                    id
                    first_name
                    last_name
                }
            }
        }
    `, data);
    t.deepEqual(actual, expected);
});
