import test from 'ava';
import parseMeta from './metaParser';

test('metaParser: simple object', t => {
    const expected = {
        a: 'foo',
        b: 1,
        c: false,
        d: true,
        e: undefined,
        f: null,
        g: 5.5,
    };
    const actual = parseMeta(expected);
    t.false(Object.is(expected, actual));
    t.deepEqual(expected, actual);
});

test('metaParser: nested objects', t => {
    const data = {
        a: {
            b: {
                c: {
                    d: {
                        e: {
                            f: {
                                g: {
                                    meta: '{"foo": "bar"}',
                                },
                            },
                        },
                    },
                },
            },
        },
        z: null,
    };
    const expected = {
        a: {
            b: {
                c: {
                    d: {
                        e: {
                            f: {
                                g: {
                                    meta: {
                                        foo: 'bar',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        z: null,
    };
    const actual = parseMeta(data);
    t.deepEqual(actual, expected);
});

test('metaParser: complex nested structures', t => {
    const data = {
        a: {
            b: [
                {
                    c: null,
                },
                {
                    d: 'hello',
                    e: [1, 2, 3, null, 5, undefined],
                },
                ['hello', 'world'],
                12,
            ],
            f: {
                g: [
                    {
                        h: {
                            i: 12,
                            j: false,
                            k: [{ meta: '{"foo": "bar"}' }],
                            meta: '{"foo": "bar"}',
                        },
                    },
                ],
            },
        },
    };
    const expected = {
        a: {
            b: [
                {
                    c: null,
                },
                {
                    d: 'hello',
                    e: [1, 2, 3, null, 5, undefined],
                },
                ['hello', 'world'],
                12,
            ],
            f: {
                g: [
                    {
                        h: {
                            i: 12,
                            j: false,
                            k: [{ meta: {foo: 'bar'} }],
                            meta: {foo: 'bar'},
                        },
                    },
                ],
            },
        },
    };
    const actual = parseMeta(data);
    t.deepEqual(actual, expected);
});
