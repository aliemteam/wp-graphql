import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { TypedFields } from '../../../lib/strongTypes';

export interface ImageMeta {
    /** Image aperture. */
    aperture: string;
    /** Details about the camera used to take the photo. */
    camera: string;
    /** Image caption. */
    caption: string;
    /** Copyright details. */
    copyright: string;
    /** ISO8601 timestamp. */
    created_timestamp: string;
    /** Image credit. */
    credit: string;
    /** Image focal length. */
    focal_length: string;
    /** Image iso details. */
    iso: string;
    /** List of keywords */
    keywords: string[];
    /** Image orientation. */
    orientation: string;
    /** Image shutter speed. */
    shutter_speed: string;
    /** Image title. */
    title: string;
}
const imageMetaFields: TypedFields<ImageMeta> = {
    aperture: {
        description: 'Image aperture.',
        type: GraphQLString,
    },
    camera: {
        description: 'Details about the camera used to take the photo.',
        type: GraphQLString,
    },
    caption: {
        description: 'Image caption.',
        type: GraphQLString,
    },
    copyright: {
        description: 'Copyright details.',
        type: GraphQLString,
    },
    created_timestamp: {
        description: 'ISO8601 timestamp.',
        type: GraphQLString,
    },
    credit: {
        description: 'Image credit.',
        type: GraphQLString,
    },
    focal_length: {
        description: 'Image focal length.',
        type: GraphQLString,
    },
    iso: {
        description: 'Image iso details.',
        type: GraphQLString,
    },
    keywords: {
        description: 'List of keywords.',
        type: new GraphQLList(GraphQLString),
    },
    orientation: {
        description: 'Image orientation.',
        type: GraphQLString,
    },
    shutter_speed: {
        description: 'Image shutter speed.',
        type: GraphQLString,
    },
    title: {
        description: 'Image title.',
        type: GraphQLString,
    },
};
export default new GraphQLObjectType({
    name: 'ImageMeta',
    description: 'Metadata for photographs.',
    fields: () => ({
        ...imageMetaFields,
    }),
});
