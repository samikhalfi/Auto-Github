import { DEFAULT_SETTINGS, ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'link',
    label: 'Link',
    type: ESetting.TEXT_FIELD,
    defaultValue: '',
  },
  {
    key: 'Qrsize',
    label: 'QR Size',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 128,
  },
  {
    key: 'level',
    label: 'Level',
    type: ESetting.SELECT,
    defaultValue: 'L',
    options:[
      {
        label: "L",
        value: "L"
      },
      {
        label: "M",
        value: "M"
      },
      {
        label: "Q",
        value: "Q"
      },
      {
        label: "H",
        value: "H"
      },
    ]
  },
  {
    key: 'includeMargin',
    label: 'Margin',
    type: ESetting.CHECKBOX,
  },
];

const colorSettings: TSetting[] = [
  {
    key: 'QrfgColor',
    label: 'Font',
    type: ESetting.COLOR_PICKER,
    defaultValue: "#000000",
  },
  {
    key: 'QrbgColor',
    label: 'Background',
    type: ESetting.COLOR_PICKER,
    defaultValue: "#FFFFFF",
  },
];

const cssSettings: TSetting[] = [
  {
    key: 'cssClass',
    label: 'CSS Class',
    type: ESetting.CSSCLASS_SELECTOR,
  },
];

const imageSettings: TSetting[] = [
  {
    key: 'src',
    label: 'Image Source',
    type: ESetting.TEXT_FIELD,
    defaultValue: '',
  },
  {
    key: 'heightImage',
    label: 'Height',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 20,
  },
  {
    key: 'widthImage',
    label: 'Width',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 20,
  },
  {
    key: 'excavate',
    label: 'Excavate',
    type: ESetting.CHECKBOX,
  },
];

const layoutSettings: TSetting[] = [
  {
    key: 'layout',
    label: 'Layout',
    type: ESetting.LAYOUT,
  },
]

const borderSettings: TSetting[] = [
  {
    key: 'qrBorders',
    label: 'QrBorders',
    type: ESetting.BORDERS,
  },
]

const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  ...load(DEFAULT_SETTINGS).filter(
    'appearance',
    'style',
    'color',
    'background',
    'font',
    'borders',
    'borderRadius',
  ),
  {
    key: 'css',
    label: 'CSS',
    type: ESetting.GROUP,
    components: cssSettings,
  },
  {
    key: 'qrColors',
    label: 'QR Colors',
    type: ESetting.GROUP,
    components: colorSettings,
  },
  {
    key: 'imageSettings',
    label: 'Image Settings',
    type: ESetting.GROUP,
    components: imageSettings,
  },
  {
    key: 'layout',
    label: 'Layout',
    type: ESetting.GROUP,
    components: layoutSettings,
  },
  {
    key: 'borders',
    label: 'Borders',
    type: ESetting.GROUP,
    components: borderSettings,
  },
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter('style.overflow'),
];

export default Settings;
