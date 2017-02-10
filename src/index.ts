import axios from 'axios';
import GraphqlJSTransport from 'lokka-transport-graphql-js';
import queryString from './lib/queryString';
import schema from './models/schema';

export interface WPGQLOpts {
    __INTERNAL_TESTING__?: boolean;
}

export default class WPGraphQL {
    private transport;
    constructor(hostUrl: string, { ...opts }: WPGQLOpts = {}) {
        this.transport = new GraphqlJSTransport(schema, { context: this });
        axios.defaults.baseURL = hostUrl;
        if (opts.__INTERNAL_TESTING__) {
            axios.defaults.auth = { username: 'root', password: 'root' };
        }
    }
    public send(gql: string, vars?: object) {
        return this.transport.send(gql, vars);
    }
    @queryString
    protected delete(path: string, args: string): PromiseLike<any> {
        return axios.delete(`${path}${args}`).then(res => res.data);
    }
    @queryString
    protected get(path: string, args: string): PromiseLike<any> {
        return axios.get(`${path}${args}`).then(res => res.data);
    }
    protected post(path: string, args: { [k: string]: any }): PromiseLike<any> {
        return axios.post(path, args).then(res => res.data);
    }
}
