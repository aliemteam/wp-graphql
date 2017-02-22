import { GraphQLInt, GraphQLObjectType } from 'graphql';
import { basePost, BasePost, RawBasePost } from '../../../lib/abstract-types/';
import { TypedFields } from '../../../lib/strongTypes';

export interface UniquePageFields {
    /** The order of the object in relation to other object of its type. */
    menu_order: number;
    /** The id for the parent of the object. */
    parent: number;
}

export interface Page<TMeta = { [k: string]: any }> extends BasePost<TMeta>, UniquePageFields {
    /** String literal. Will always be "page" for pages. */
    type: 'page';
}

const pageFields: TypedFields<UniquePageFields, (UniquePageFields & RawBasePost), {}> = {
     menu_order: {
        type: GraphQLInt,
        description: 'The order of the object in relation to other object of its type.',
    },
    parent: {
        type: GraphQLInt,
        description: 'The id for the parent of the object.',
    },
};

export default new GraphQLObjectType({
    name: 'Page',
    description: 'A WordPress Page Object.',
    fields: () => ({
       ...basePost,
       ...pageFields,
    }),
});
