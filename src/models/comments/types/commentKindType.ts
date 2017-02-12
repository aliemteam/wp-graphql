import { GraphQLEnumType } from 'graphql';
import enumFactory from '../../../lib/type-factories/enumFactory';

export type CommentKind = 'comment'|'pingback'|'trackback';

const commentKind: GraphQLEnumType = enumFactory('CommentType', ['comment', 'pingback', 'trackback']);

export default commentKind;
