import * as axios from 'axios';
import GraphqlJSTransport from 'lokka-transport-graphql-js';
import schema from './models/schema';

export default class WPGraphQL {
    private transport;
    constructor(private hostUrl: string) {
        this.transport = new GraphqlJSTransport(schema, { context: this });
    }
    public send(gql: string) {
        return this.transport.send(gql);
    }
    protected get(path: string, args: object) {
        let params = '?';
        for (const key of Object.keys(args)) {
            params += `${key}=` + encodeURIComponent(args[key]);
        }
        return axios.get(`${this.hostUrl}${path}${params}`).then(res => res.data);
    }
}
