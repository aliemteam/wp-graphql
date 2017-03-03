import { GraphQLEnumType } from 'graphql';
import enumFactory from '../../../lib/type-factories/enumFactory';

export type CommentStatus = 'approve'|'hold'|'spam'|'trash';

const commentStatusType: GraphQLEnumType = enumFactory('CommentStatus', ['approve', 'hold', 'spam', 'trash']);

export default commentStatusType;
