import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'name',
    label: 'Root Name',
    type: ESetting.TEXT_FIELD,
  },
  {
    key: 'theme',
    label: 'Theme',
    type: ESetting.SELECT,
    options: [
      {
        label: 'basic',
        value: 'basic',
      },
      {
        label: 'monokai',
        value: 'monokai',
      },
      {
        label: 'ocean',
        value: 'ocean',
      },
      {
        label: 'paraiso',
        value: 'paraiso',
      },
      {
        label: 'pop',
        value: 'pop',
      },
      {
        label: 'railscasts',
        value: 'railscasts',
      },
      {
        label: 'greenscreen',
        value: 'greenscreen',
      },
      {
        label: 'solarized',
        value: 'solarized',
      },
      {
        label: 'summerfruit',
        value: 'summerfruit',
      },
      {
        label: 'summerfruit:inverted',
        value: 'summerfruit:inverted',
      },
    ],
    defaultValue: 'basic',
  },
  {
    key: 'indentWidth',
    label: 'Indent width',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 15,
  },
  {
    key: 'collapsed',
    label: 'Collapse',
    type: ESetting.CHECKBOX,
  },
  {
    key: 'iconStyle',
    label: 'Icon Style',
    defaultValue: 'circle',
    type: ESetting.SELECT,
    options: [
      {
        label: 'circle',
        value: 'circle',
      },
      {
        label: 'triangle',
        value: 'triangle',
      },
      {
        label: 'square',
        value: 'square',
      },
    ],
  },
  {
    key: 'displayDataTypes',
    label: 'Display Data Types',
    type: ESetting.CHECKBOX,
  },
  {
    key: 'collapseStringsAfterLength',
    label: 'Collapse Strings After Length',
    type: ESetting.NUMBER_FIELD,
  },
  {
    key: 'groupArraysAfterLength',
    label: 'Group Arrays After Length',
    type: ESetting.NUMBER_FIELD,
  },
  {
    key: 'displayObjectSize',
    label: 'Display Object Size',
    type: ESetting.CHECKBOX,
  },
  {
    key: 'sortKeys',
    label: 'Sort Keys',
    type: ESetting.CHECKBOX,
  },
  {
    key: 'enableClipboard',
    label: 'Enable Clipboard',
    type: ESetting.CHECKBOX,
  },
  {
    key: 'quotesOnKeys',
    label: 'Quotes On keys',
    type: ESetting.CHECKBOX,
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
