import { GraphQLEnumType } from 'graphql';
import enumFactory from '../../../lib/type-factories/enumFactory';

export type PostOrderBy = 'date'|'id'|'include'|'relevance'|'slug'|'title';

const postOrderByType: GraphQLEnumType = enumFactory('PostOrderBy',
    ['date', 'id', 'include', 'relevance', 'slug', 'title'],
);

export default postOrderByType;
