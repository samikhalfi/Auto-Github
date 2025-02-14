import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'panels',
    label: 'Panels',
    type: ESetting.GROUP,
    components: [
      { key: 'filterMode', label: 'Filter Mode', type: ESetting.CHECKBOX, defaultValue: true },
      {
        key: 'saveInStorage',
        label: 'Save in local storage',
        type: ESetting.CHECKBOX,
        defaultValue: false,
      },
      {
        key: 'preventCollision',
        label: 'Prevent Collision',
        type: ESetting.CHECKBOX,
        defaultValue: true,
      },
      { key: 'rowHeight', label: 'Row Height', type: ESetting.NUMBER_FIELD, defaultValue: 30 },
      { key: 'marginX', label: 'Margin X', type: ESetting.NUMBER_FIELD, defaultValue: 10 },
      { key: 'marginY', label: 'Margin Y', type: ESetting.NUMBER_FIELD, defaultValue: 10 },
      {
        key: 'cards',
        label: 'Cards',
        name: 'cards',
        type: ESetting.DATAGRID,
        data: [
          {
            key: 'title',
            label: 'Title',
            type: ESetting.TEXT_FIELD,
            defaultValue: '',
          },
          {
            key: 'x',
            label: 'X',
            type: ESetting.NUMBER_FIELD,
            defaultValue: 0,
          },
          {
            key: 'y',
            label: 'Y',
            type: ESetting.NUMBER_FIELD,
            defaultValue: 0,
          },
          {
            key: 'h',
            label: 'Height',
            type: ESetting.NUMBER_FIELD,
            defaultValue: 1,
          },
          {
            key: 'w',
            label: 'Width',
            type: ESetting.NUMBER_FIELD,
            defaultValue: 1,
          },
          { key: 'static', label: 'Static', type: ESetting.CHECKBOX, defaultValue: false },
          { key: 'isResizable', label: 'Resizable', type: ESetting.CHECKBOX, defaultValue: true },
          { key: 'isDraggable', label: 'Draggable', type: ESetting.CHECKBOX, defaultValue: true },
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
  ...load(DEFAULT_SETTINGS).filter('display'),
];

console.log('DEFAULT_SETTINGS', DEFAULT_SETTINGS);
export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter('style.overflow', 'display'),
];

export default Settings;
