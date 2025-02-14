import { ESetting, TSetting } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'parameters',
    label: 'Parameters',
    titleProperty: 'name',
    type: ESetting.DATAGRID,
    data: [
      {
        key: 'name',
        label: 'Name',
        type: ESetting.TEXT_FIELD,
      },
      {
        key: 'source',
        label: 'Source',
        type: ESetting.DS_AUTO_SUGGEST,
      },
      {
        key: 'defaultValue',
        label: 'Default Value',
        type: ESetting.TEXT_FIELD,
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
];

export const BasicSettings: TSetting[] = [...commonSettings];

export default Settings;
