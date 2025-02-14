import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { RiLayoutMasonryLine } from 'react-icons/ri';

import LayoutsSettings, { BasicSettings } from './Layouts.settings';

export default {
  craft: {
    displayName: 'Layouts',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
      cards: [
        {
          id: 'Card_1',
          i: 'Card_1',
          title: 'Card_1',
          x: 0,
          y: 0,
          w: 2,
          h: 2,
          static: false,
          isResizable: true,
          isDraggable: true,
        },
      ],
    },
    related: {
      settings: Settings(LayoutsSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Layouts',
    exposed: true,
    icon: RiLayoutMasonryLine,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
    ],
    datasources: {
      accept: ['array'],
    },
  },
  defaultProps: {
    marginX: 10,
    marginY: 10,
    rowHeight: 100,
    filterMode: true,
    saveInStorage: false,
    preventCollision: true,
  },
} as T4DComponentConfig<ILayoutsProps>;

export interface ILayoutsProps extends webforms.ComponentProps {
  cards: ICards[];
  marginX: number;
  marginY: number;
  rowHeight: number;
  preventCollision: boolean;
  filterMode?: boolean;
  saveInStorage?: boolean;
}

export interface ICards {
  id: string;
  i: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  static: boolean;
  isResizable?: boolean;
  isDraggable?: boolean;
}
