import { TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [];

const Settings: TSetting[] = [
  ...load(DEFAULT_SETTINGS).filter('style.overflow', 'background', 'color', 'font'),
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter('style.overflow', 'background', 'color', 'font'),
];

export default Settings;
