import { GraphQLArgumentConfig, GraphQLFieldConfig, GraphQLFieldResolver, GraphQLOutputType } from 'graphql';

export interface ArgumentConfig extends GraphQLArgumentConfig {
    description: string;
}

export interface FieldConfig<TSource, TContext> extends GraphQLFieldConfig<TSource, TContext> {
    description: string;
}

export interface StrongTypedFieldConfig<T, TSource, TContext> {
    type: GraphQLOutputType;
    args?: {
        [P in keyof T]: ArgumentConfig;
    };
    resolve?: GraphQLFieldResolver<TSource, TContext>;
    deprecationReason?: string;
    description?: string;
}

export type TypedFields<T, TSource, TContext> = {
    [P in keyof T]: FieldConfig<TSource, TContext>;
};
