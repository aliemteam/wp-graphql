import { Meta, RawMeta } from '../abstract-types/metaType';
export interface MetaObj {
    meta: RawMeta;
    [k: string]: any;
}

export default function metaParser({ meta }: MetaObj): Meta {
    return Object.keys(meta).map(key => {
        if (!Array.isArray(meta[key])) {
            return { key, value: meta[key] };
        }
        const value = meta[key][1] === undefined
            ? meta[key][0]
            : JSON.stringify(meta[key]);
        return { key, value };
    });
}
