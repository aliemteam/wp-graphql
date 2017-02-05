import { GraphQLInt, GraphQLObjectType, GraphQLObjectTypeConfig } from 'graphql';
import { basePost, BasePost, RawBasePost } from '../../lib/abstract-types/';
import { TypedFields } from '../../lib/strongTypes';

export interface UniquePageFields {
    /** The order of the object in relation to other object of its type. */
    menu_order: number;
    /** The id for the parent of the object. */
    parent: number;
}

export interface Page extends BasePost, UniquePageFields {
    /** String literal. Will always be "page" for pages. */
    type: 'page';
}

type config = GraphQLObjectTypeConfig<(UniquePageFields & RawBasePost), {}>;
type fields = TypedFields<UniquePageFields, (UniquePageFields & RawBasePost), {}>;

const pageFields: fields = {
     menu_order: {
        type: GraphQLInt,
        description: 'The order of the object in relation to other object of its type.',
    },
    parent: {
        type: GraphQLInt,
        description: 'The id for the parent of the object.',
    },
};

export const pageType = new GraphQLObjectType(<config>{
    name: 'Page',
    description: 'A WordPress Page Object.',
    fields: (): fields => ({
       ...basePost,
       ...pageFields,
    }),
});
