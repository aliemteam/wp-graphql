import { ArgumentField } from '../../lib/strongTypes';
import settingsType, { Settings } from './settingsType';

const settings: ArgumentField<{}, any, any> = {
    description: 'Fetch the site settings.',
    type: settingsType,
    resolve: (_root, args, context): PromiseLike<Settings> => context.get('/settings', args),
};

export default {
    settings,
};
