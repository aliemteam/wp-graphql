import { GraphQLBoolean, GraphQLObjectType } from 'graphql';

export interface DeletedObject<T> {
    /** Boolean (usually true) stating if the post has been deleted. */
    deleted: boolean;
    /** The entire deleted post object. */
    previous: T;
}

export type DeletedUnion<T> = T | DeletedObject<T>;

export default function deletedObjectFactory<T extends GraphQLObjectType>(type: T): GraphQLObjectType {
    return new GraphQLObjectType({
        name: `Deleted${type.name}`,
        description: `An object representing the API response for a deleted ${type.name}.`,
        fields: {
            deleted: {
                description: 'Boolean (usually true) stating if the object has been deleted.',
                type: GraphQLBoolean,
            },
            previous: {
                description: `The entire deleted ${type.name}.`,
                type,
            },
        },
    });
}
