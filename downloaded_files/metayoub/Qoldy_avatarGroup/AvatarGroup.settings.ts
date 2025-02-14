import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [];

const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  {
    key: 'image',
    label: 'Image',
    type: ESetting.TEXT_FIELD,
  },
  {
    key: 'title',
    label: 'Title',
    type: ESetting.TEXT_FIELD,
  },
  {
    key: 'maxLength',
    label: 'Max Length',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 3,
  },
  ...DEFAULT_SETTINGS,
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter('style.overflow'),
];

export default Settings;
