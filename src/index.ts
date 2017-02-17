import axios from 'axios';
import { GraphQLFieldConfigMap, GraphQLObjectType, GraphQLSchema } from 'graphql';
import GraphqlJSTransport from 'lokka-transport-graphql-js';
import parseMeta from './lib/core/metaParser';
import queryString from './lib/core/queryString';
import defaultMutations from './models/mutations';
import defaultQueries from './models/queries';
import defaultSchema from './models/schema';

export {
    defaultMutations as mutations,
    defaultQueries as queries,
    defaultSchema as schema,
};

export interface WPGQLOpts {
    __INTERNAL_TESTING__?: boolean;
    cookieAuth?: string;
    context?: any;
    mutations?: GraphQLFieldConfigMap<any, any>;
    queries?: GraphQLFieldConfigMap<any, any>;
}

// { mutations = {}, queries = {}, ...opts }: WPGQLOpts = {}

export default class WPGraphQL {
    private transport;
    constructor(hostUrl: string, opts: WPGQLOpts = {}) {
        const { queries, mutations, context } = opts;
        const schema = buildSchema({ mutations, queries });
        this.transport = new GraphqlJSTransport(schema, { rootValue: this, context });
        axios.defaults.baseURL = hostUrl;
        if (opts.cookieAuth) {
            axios.defaults.headers.common['X-WP-Nonce'] = opts.cookieAuth;
        }
        if (opts.__INTERNAL_TESTING__) {
            axios.defaults.auth = { username: 'root', password: 'root' };
        }
    }
    public send(gql: string, vars?: object) {
        return this.transport.send(gql, vars).then(parseMeta);
    }
    @queryString
    protected delete(path: string, args: string): PromiseLike<any> {
        return axios.delete(`${path}${args}`).then(res => res.data);
    }
    @queryString
    protected get(path: string, args: string): PromiseLike<any> {
        return axios.get(`${path}${args}`).then(res => res.data);
    }
    protected post(path: string, args: object): PromiseLike<any> {
        return axios.post(path, parseMeta(args)).then(res => res.data);
    }
    protected upload(path: string, { file, filename, ...args }): PromiseLike<any> {
        return axios.post(path, file, {
            headers: {'Content-Disposition': `attachment;filename=${filename}`},
        }).then(res => {
            const { id } = res.data;
            return this.post(`${path}/${id}`, args);
        });
    }
}

interface BuildSchemaArgs {
    mutations?: GraphQLFieldConfigMap<any, any>;
    queries?: GraphQLFieldConfigMap<any, any>;
}

function buildSchema({ mutations = {}, queries = {} }: BuildSchemaArgs): GraphQLSchema {
    return new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            description: 'The root query.',
            fields: () => ({ ...queries, ...defaultQueries }),
        }),
        mutation: new GraphQLObjectType({
            name: 'Mutation',
            description: 'The root mutation.',
            fields: () => ({ ...mutations, ...defaultMutations }),
        }),
    });
}
