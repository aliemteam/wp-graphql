import test from 'ava';
import queryString from './queryString';

test('queryString', t => {
    class Test {
        @queryString
        public method(path, arg) {
            return `${path}${arg}`;
        }
    }
    const tester = new Test();
    t.is(tester.method('/test', { id: 1, foo: 'bar' }), '/test?id=1&foo=bar&');
    t.is(tester.method('/test', {}), '/test?');
    t.throws(new Promise(() => tester.method('/test', 'hello')));
});
