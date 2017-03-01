import { GraphQLArgumentConfig, GraphQLFieldConfig, GraphQLFieldResolver, GraphQLOutputType } from 'graphql';

export interface Meta {
    [metaKey: string]: any;
}

export interface ArgumentConfig extends GraphQLArgumentConfig {
    description: string;
}

export interface FieldConfig<TSource, TContext> extends GraphQLFieldConfig<TSource, TContext> {
    description: string;
}

export interface Source {
    delete<T = any>(path: string, args: object): PromiseLike<T>;
    get<T = any>(path: string, args: object): PromiseLike<T>;
    post<T = any>(path: string, args: object): PromiseLike<T>;
    upload<T = any>(path: string, args: object): PromiseLike<T>;
}

export interface ArgumentField<T> {
    type: GraphQLOutputType;
    args?: {
        [P in keyof T]: ArgumentConfig;
    };
    resolve?: GraphQLFieldResolver<Source, any>;
    deprecationReason?: string;
    description?: string;
}

export type TypedFields<TResolved, TRaw = TResolved> = {
    [P in keyof TResolved]: FieldConfig<TRaw, {}>;
};
