import * as axios from 'axios';
import GraphqlJSTransport from 'lokka-transport-graphql-js';
import queryString from './lib/queryString';
import schema from './models/schema';

export default class WPGraphQL {
    private transport;
    constructor(hostUrl: string) {
        this.transport = new GraphqlJSTransport(schema, { context: this });
        axios.defaults.baseURL = hostUrl;
    }
    public send(gql: string) {
        return this.transport.send(gql);
    }
    @queryString
    protected get(path: string, args: string) {
        return axios.get(`${path}${args}`).then(res => res.data);
    }
}
