import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'penColor',
    label: 'Pen Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: 'black',
  },
  {
    key: 'backgroundColor',
    label: 'Background Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: 'white',
  },
  {
    key: 'clear',
    label: 'Clear Button',
    type: ESetting.CHECKBOX,
    defaultValue: true,
  },
  {
    key: 'sizeButton',
    label: 'Size Button',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 0,
  },
  {
    key: 'positionButton',
    label: 'Position Button',
    type: ESetting.SELECT,
    defaultValue: 'left',
    options: [
      {
        label: 'Left',
        value: 'left',
      },
      {
        label: 'Right',
        value: 'right',
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
  ...load(DEFAULT_SETTINGS).filter(
    'appearance',
    'font',
    'background',
    'style.color',
    'style.backgroundColor',
  ),
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter(
    'style.color',
    'style.backgroundColor',
    'display',
    'style.fontFamily',
    'style.fontWeight',
    'style.fontSize',
    'style.fontWeight',
    'style.textAlign',
    'style.textTransform',
  ),
];

console.log('BASIC_SETTINGS', BASIC_SETTINGS);

export default Settings;
