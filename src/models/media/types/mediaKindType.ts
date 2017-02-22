import { GraphQLEnumType } from 'graphql';
import enumFactory from '../../../lib/type-factories/enumFactory';

export type MediaKind = 'file'|'image';
export const mediaKindType: GraphQLEnumType = enumFactory('MediaKind',
    ['file', 'image'],
);

export type MediaMimeBase = 'application'|'audio'|'image'|'text'|'video';
export const mediaMimeBaseType = enumFactory('MediaMimeType',
    ['application', 'audio', 'image', 'text', 'video'],
);

export default mediaKindType;
