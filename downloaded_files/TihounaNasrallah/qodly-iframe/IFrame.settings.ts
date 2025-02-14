import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'name',
    label: 'Name',
    type: ESetting.TEXT_FIELD,
    defaultValue: 'iframe',
  },
  {
    key: 'allowfullscreen',
    label: 'Allow Fullscreen',
    type: ESetting.CHECKBOX,
    defaultValue: true,
  },
  {
    key: 'referrerpolicy',
    label: 'Referrer Policy',
    type: ESetting.SELECT,
    defaultValue: 'strict-origin-when-cross-origin',
    options: [
      { label: 'no-referrer-when-downgrade', value: 'no-referrer-when-downgrade' },
      { label: 'no-referrer', value: 'no-referrer' },
      { label: 'same-origin', value: 'same-origin' },
      { label: 'origin', value: 'origin' },
      { label: 'strict-origin', value: 'strict-origin' },
      { label: 'origin-when-cross-origin', value: 'origin-when-cross-origin' },
      { label: 'strict-origin-when-cross-origin', value: 'strict-origin-when-cross-origin' },
      { label: 'unsafe-url', value: 'unsafe-url' },
    ],
  },
  {
    key: 'loading',
    label: 'Loading',
    type: ESetting.SELECT,
    defaultValue: 'eager',
    options: [
      { label: 'eager', value: 'eager' },
      { label: 'lazy', value: 'lazy' },
    ],
  },
  {
    key: 'Ipermissions',
    label: 'Permissions',
    titleProperty: 'permission',
    type: ESetting.DATAGRID,
    data: [
      {
        key: 'permission',
        label: 'Permission',
        type: ESetting.TEXT_FIELD,
        defaultValue: '',
      },
    ],
  },
  {
    key: 'Isandbox',
    label: 'Sandbox',
    titleProperty: 'restriction',
    type: ESetting.DATAGRID,
    data: [
      {
        key: 'restriction',
        label: 'Restriction',
        type: ESetting.SELECT,
        options: [
          { label: 'allow-forms', value: 'allow-forms' },
          { label: 'allow-modals', value: 'allow-modals' },
          { label: 'allow-popups', value: 'allow-popups' },
          { label: 'allow-popups-to-escape-sandbox', value: 'allow-popups-to-escape-sandbox' },
          { label: 'allow-same-origin', value: 'allow-same-origin' },
          { label: 'allow-scripts', value: 'allow-scripts' },
          { label: 'allow-top-navigation', value: 'allow-top-navigation' },
          {
            label: 'allow-storage-access-by-user-activation',
            value: 'allow-storage-access-by-user-activation',
          },
          {
            label: 'allow-top-navigation-by-user-activation',
            value: 'allow-top-navigation-by-user-activation',
          },
          { label: 'allow-downloads', value: 'allow-downloads' },
          { label: 'allow-orientation-lock', value: 'allow-orientation-lock' },
          { label: 'allow-presentation', value: 'allow-presentation' },
          { label: 'allow-pointer-lock', value: 'allow-pointer-lock' },
        ],
      },
    ],
  },
];

const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  ...DEFAULT_SETTINGS,
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter('style.overflow'),
];

export default Settings;
