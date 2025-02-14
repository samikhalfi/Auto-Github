import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdColorLens } from 'react-icons/md';

import ColorInputSettings, { BasicSettings } from './ColorInput.settings';

export default {
  craft: {
    displayName: 'Color Input',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(ColorInputSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Color Input',
    exposed: true,
    icon: MdColorLens,
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
      accept: ['string'],
    },
  },
  defaultProps: {
    defaultColor: '#fff',
  },
} as T4DComponentConfig<IColorInputProps>;

export interface IColorInputProps extends webforms.ComponentProps {
  defaultColor: string;
}
