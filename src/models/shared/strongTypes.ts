import { GraphQLArgumentConfig, GraphQLFieldConfig, GraphQLFieldResolver, GraphQLOutputType } from 'graphql';

export interface StrongTypedFieldConfig<T, TSource, TContext> {
    type: GraphQLOutputType;
    args?: {
        [P in keyof T]: GraphQLArgumentConfig;
    };
    resolve?: GraphQLFieldResolver<TSource, TContext>;
    deprecationReason?: string;
    description?: string;
}

export type TypedFields<T, TSource, TContext> = {
    [P in keyof T]: GraphQLFieldConfig<TSource, TContext>;
};
