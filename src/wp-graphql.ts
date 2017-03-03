import axios from 'axios';
import { GraphQLFieldConfigMap, GraphQLObjectType, GraphQLSchema } from 'graphql';
import GraphqlJSTransport from 'lokka-transport-graphql-js';
import bootstrapPostResolvers, { CustomPostTypeParams } from './lib/core/bootstrapPostResolvers';
import parseMeta from './lib/core/metaParser';
import queryString from './lib/core/queryString';
import defaultMutations from './models/mutations';
import defaultQueries from './models/queries';

/** Authenticate with Basic Auth (Requires Basic Auth plugin) */
export interface BasicAuth {
    username: string;
    password: string;
}

/** Either a BasicAuth object or a WordPress nonce string */
export type Authentication = BasicAuth | string;

export interface Config {
    auth?: Authentication;
    /** Add context to be passed to all resolvers. */
    context?: any;
    /** Custom mutations to be merged into the library upon instantiation. */
    mutations?: GraphQLFieldConfigMap<any, any>;
    /** List of `postTypeConfig` to be merged into the library upon instantiation. */
    postTypes?: CustomPostTypeParams[];
    /** Custom queries to be merged into the library upon instantiation. */
    queries?: GraphQLFieldConfigMap<any, any>;
}

export interface TransportLayer {
    send<T = any>(gql: string, variables?: object, operationName?: string): Promise<T>;
    batch<T = any>(gql: string, operationNames: string[], variables?: object): Promise<T>;
}

export default class WPGraphQL implements TransportLayer {
    /**
     * GraphQL transport layer.
     */
    private transport: TransportLayer;

    /**
     * @param hostUrl  The REST URL for the site up to, but not including, the namespace
     *                 and without a trailing slash.
     * @param config   An object containing configuration options for the instance.
     */
    constructor(hostUrl: string, config: Config = {}) {
        const { auth, context, mutations: userMutations, queries: userQueries } = config;
        let mutations = { ...userMutations, ...defaultMutations };
        let queries = { ...userQueries, ...defaultQueries };

        ({ mutations, queries } = bootstrapPostResolvers({ mutations, queries }, config.postTypes));

        axios.defaults.baseURL = hostUrl;

        if (typeof auth === 'string') {
            axios.defaults.headers.common['X-WP-Nonce'] = auth;
        }

        if (typeof auth === 'object') {
            axios.defaults.auth = auth;
        }

        const schema = buildSchema({ mutations, queries });
        this.transport = new GraphqlJSTransport(schema, { rootValue: this, context });
    }
    public send<T = any>(gql: string, vars?: object, operationName?: string): Promise<T> {
        return this.transport.send(gql, vars, operationName).then(parseMeta);
    }
    public async batch<T = any>(gql: string, operationNames: string[], vars?: object): Promise<T> {
        let data = {};
        let batchedVars;
        for (const operation of operationNames) {
            const d = await this.transport.send<any>(gql, { ...vars, ...batchedVars }, operation);
            batchedVars = d.extract;
            data = {
                ...data,
                ...d,
            };
        }
        return parseMeta(data);
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
    mutations: GraphQLFieldConfigMap<any, any>;
    queries: GraphQLFieldConfigMap<any, any>;
}

function buildSchema({ mutations, queries }: BuildSchemaArgs): GraphQLSchema {
    return new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            description: 'The root query.',
            fields: () => ({ ...queries }),
        }),
        mutation: new GraphQLObjectType({
            name: 'Mutation',
            description: 'The root mutation.',
            fields: () => ({ ...mutations }),
        }),
    });
}
