import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlineDataObject } from 'react-icons/md';

import ObjectViewerSettings, { BasicSettings } from './ObjectViewer.settings';

export default {
  craft: {
    displayName: 'ObjectViewer',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(ObjectViewerSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'ObjectViewer',
    exposed: true,
    icon: MdOutlineDataObject,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
      {
        label: 'On Blur',
        value: 'onblur',
      },
      {
        label: 'On Focus',
        value: 'onfocus',
      },
      {
        label: 'On MouseEnter',
        value: 'onmouseenter',
      },
      {
        label: 'On MouseLeave',
        value: 'onmouseleave',
      },
      {
        label: 'On KeyDown',
        value: 'onkeydown',
      },
      {
        label: 'On KeyUp',
        value: 'onkeyup',
      },
    ],
    datasources: {
      accept: ['object'],
    },
  },
  defaultProps: {
    theme: 'basic',
    indentWidth: 15,
    iconStyle: 'circle',
    collapseStringsAfterLength: 100,
    groupArraysAfterLength: 5,
    name: 'root',
    enableClipboard: false,
    quotesOnKeys: false,
    displayObjectSize: false,
    displayDataTypes: false,
  },
} as T4DComponentConfig<IObjectViewerProps>;

export interface IObjectViewerProps extends webforms.ComponentProps {
  theme: any;
  indentWidth: number;
  collapsed: boolean;
  iconStyle: any; //string | 'circle';
  collapseStringsAfterLength: number;
  groupArraysAfterLength: number;
  displayDataTypes: boolean;
  displayObjectSize: boolean;
  sortKeys: boolean;
  name: string;
  enableClipboard: boolean;
  quotesOnKeys: boolean;
}
