import { GraphQLEnumType } from 'graphql';
import enumFactory from '../../../lib/type-factories/enumFactory';

export type MediaStatus = 'inherit'|'private'|'trash';

const mediaStatusType: GraphQLEnumType = enumFactory('MediaStatus',
    ['inherit', 'private', 'trash'],
);

export default mediaStatusType;
