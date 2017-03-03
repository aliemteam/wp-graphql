import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { TypedFields } from '../../../lib/strongTypes';
import imageMetaType, { ImageMeta } from './imageMetaType';
import mediaSizeType, { MediaSize } from './mediaSizeType';

export interface MediaDetailsBase {
    /** The file path relative to `wp-content/uploads/` */
    file: string;
    /** The height of the attachment */
    height: number;
    /** Metadata about the image (if media type is image) */
    image_meta: ImageMeta;
    /** The width of the attachment */
    width: number;
}

export interface MediaDetailsRaw extends MediaDetailsBase {
    /** Keys are size slugs, values are MediaSizeDetails */
    sizes: {
        thumbnail: MediaSize;
        medium?: MediaSize;
        large?: MediaSize;
        full: MediaSize;
        [customSize: string]: MediaSize|undefined;
    };
}

export interface MediaDetails extends MediaDetailsBase {
    /** Array of MediaSizeDetails */
    sizes: MediaSize[];
}

const mediaDetailsFields: TypedFields<MediaDetails, MediaDetailsRaw> = {
    file: {
        description: '',
        type: GraphQLString,
    },
    height: {
        description: '',
        type: GraphQLInt,
    },
    image_meta: {
        description: '',
        type: imageMetaType,
    },
    sizes: {
        description: '',
        type: new GraphQLList(mediaSizeType),
        resolve: details => (
            Object.keys(details.sizes).map(slug => ({
                ...details.sizes[slug], slug,
            }))
        ),
    },
    width: {
        description: '',
        type: GraphQLInt,
    },
};

export default new GraphQLObjectType({
    name: 'MediaDetails',
    description: 'Details about the resource file, specific to its type.',
    fields: () => ({
        ...mediaDetailsFields,
    }),
});
