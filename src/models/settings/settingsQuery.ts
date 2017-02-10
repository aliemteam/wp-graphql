
import { StrongTypedFieldConfig } from '../../lib/strongTypes';
import settingsType, { Settings } from './settingsType';

const settings: StrongTypedFieldConfig<{}, any, any> = {
    description: 'Fetch the site settings.',
    type: settingsType,
    resolve: (_root, args, context): PromiseLike<Settings> => context.get('/settings', args),
};

export default {
    settings,
};
