import { DEFAULT_ITERATOR, ESetting, ETextFieldModifier, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';
import { LuFlipVertical2, LuFlipHorizontal2 } from 'react-icons/lu';

const commonSettings: TSetting[] = [
  {
    key: 'variant',
    label: 'Variant',
    type: ESetting.SELECT,
    options: [
      { label: 'variant1', value: 'value1' },
      { label: 'variant2', value: 'value2' },
    ],
    defaultValue: 'value1',
  },

  {
    label: 'Orientation',
    type: ESetting.RADIOGROUP,
    key: 'orientation',
    multiple: false,
    options: [
      {
        value: 'Vertical',
        tooltip: 'Vertical',
        icon: LuFlipVertical2,
      },
      {
        value: 'Horizontal',
        tooltip: 'Horizontal',
        icon: LuFlipHorizontal2,
      },
    ],
  },
];

const dataAccessSettings: TSetting[] = [
  {
    key: 'datasource',
    label: 'DataSource',
    type: ESetting.DS_AUTO_SUGGEST,
  },
  {
    key: 'currentElement',
    label: 'Selected Element',
    type: ESetting.DS_AUTO_SUGGEST,
  },
  {
    key: 'iterator',
    label: 'Iterate with',
    type: ESetting.TEXT_FIELD,
    modifier: ETextFieldModifier.ITERATOR,
    placeholder: DEFAULT_ITERATOR,
  },
];
const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  {
    key: 'dataAccess',
    label: 'Data Access',
    type: ESetting.GROUP,
    components: dataAccessSettings,
  },
  ...load(DEFAULT_SETTINGS).filter('dataAccess', 'background', 'appearance', 'font'),
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter('dataAccess', 'style.overflow', 'background', 'appearance', 'font'),
];

export default Settings;
