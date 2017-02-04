/**
 * Decorator used for transforming an object of arguments given to a method as the
 * second parameter into a query string.
 */
export default function(_target: any, _key: string, descriptor: PropertyDescriptor) {
    return {
        ...descriptor,
        value() {
            const args = arguments[1];
            if (typeof args !== 'object') {
                throw TypeError('Query args must be an object');
            }
            let params = '?';
            for (const key of Object.keys(args)) {
                params += `${key}=` + encodeURIComponent(args[key]) + '&';
            }
            arguments[1] = params;
            return descriptor.value.apply(this, arguments);
        },
    };
}
