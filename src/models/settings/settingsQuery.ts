import { namespace as NS } from '../../lib/constants';
import { ArgumentField } from '../../lib/strongTypes';
import settingsType, { Settings } from './types/settingsType';

const settings: ArgumentField<{}> = {
    description: 'Fetch the site settings.',
    type: settingsType,
    resolve: (root, args) => (
        root.get<Settings>(`/${NS}/settings`, args)
    ),
};

export default {
    settings,
};
