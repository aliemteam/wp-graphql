import { GraphQLBoolean, GraphQLObjectType } from 'graphql';
import { TypedFields } from '../../../lib/strongTypes';
import userType, { User } from './userType';

export interface DeletedUser {
    /** Boolean (usually true) stating if the user has been deleted. */
    deleted: boolean;
    /** The entire deleted user object. */
    previous: User;
}

const deletedUserFields: TypedFields<DeletedUser, DeletedUser, {}> = {
    deleted: {
        description: 'Boolean (usually true) stating if the user has been deleted.',
        type: GraphQLBoolean,
    },
    previous: {
        description: 'The entire deleted user object.',
        type: userType,
    },
};

export default new GraphQLObjectType({
    name: 'DeletedUser',
    description: 'An object representing the API response for a deleted user.',
    fields: () => ({
        ...deletedUserFields,
    }),
});
