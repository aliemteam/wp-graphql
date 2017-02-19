import { GraphQLFieldConfigMap } from 'graphql';
import { postMutationFactory } from '../../models/posts/postMutation';
import { postQueryFactory } from '../../models/posts/postQuery';

export interface CustomPostTypeParams {
    /** The singular name of the custom content type. (e.g. "post") */
    name: string;
    /** The plural name of the custom content type. (e.g. "posts") */
    namePlural: string;
    /** The URL base name for the custom content type. (e.g. "posts") */
    restBase: string;
}

export interface Resolvers {
    queries: GraphQLFieldConfigMap<any, any>;
    mutations: GraphQLFieldConfigMap<any, any>;
}

export default function bootstrap(baseResolvers: Resolvers, customTypes: CustomPostTypeParams[] = []): Resolvers {
    return customTypes.reduce((resolvers: Resolvers, customType) => {
        return {
            queries: {
                ...resolvers.queries,
                ...postQueryFactory(customType),
            },
            mutations: {
                ...resolvers.mutations,
                ...postMutationFactory(customType),
            },
        };
    }, baseResolvers);
}
