import { GraphQLArgumentConfig, GraphQLFieldConfig, GraphQLFieldResolver, GraphQLOutputType } from 'graphql';

export interface ArgumentConfig extends GraphQLArgumentConfig {
    description: string;
}

export interface FieldConfig<TSource, TContext> extends GraphQLFieldConfig<TSource, TContext> {
    description: string;
}

export interface Source {
    delete(path: string, args: object): PromiseLike<any>;
    get(path: string, args: object): PromiseLike<any>;
    post(path: string, args: object): PromiseLike<any>;
    upload(path: string, args: object): PromiseLike<any>;
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

export type TypedFields<T, TSource, TContext> = {
    [P in keyof T]: FieldConfig<TSource, TContext>;
};
