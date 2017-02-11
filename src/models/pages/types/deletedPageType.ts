import { GraphQLBoolean, GraphQLObjectType } from 'graphql';
import { TypedFields } from '../../../lib/strongTypes';
import pageType, { Page } from './pageType';

export interface DeletedPage {
    /** Boolean (usually true) stating if the page has been deleted. */
    deleted: boolean;
    /** The entire deleted page object. */
    previous: Page;
}

const deletedPageFields: TypedFields<DeletedPage, DeletedPage, {}> = {
    deleted: {
        description: 'Boolean (usually true) stating if the page has been deleted.',
        type: GraphQLBoolean,
    },
    previous: {
        description: 'The entire deleted page object.',
        type: pageType,
    },
};

export default new GraphQLObjectType({
    name: 'DeletedPage',
    description: 'An object representing the API response for a deleted page.',
    fields: () => ({
        ...deletedPageFields,
    }),
});
