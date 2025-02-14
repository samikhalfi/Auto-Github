import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaSignature } from 'react-icons/fa';

import SignatureSettings, { BasicSettings } from './Signature.settings';

export default {
  craft: {
    displayName: 'Signature',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(SignatureSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Signature',
    exposed: true,
    icon: FaSignature,
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
      accept: ['image'],
    },
  },
  defaultProps: {
    clear: true,
    penColor: 'Black',
    backgroundColor: 'White',
    sizeButton: 36,
    positionButton: 'left',
    style: {
      border: '1px solid black',
      width: '300px',
      height: '200px',
    },
  },
} as T4DComponentConfig<ISignatureProps>;

export interface ISignatureProps extends webforms.ComponentProps {
  penColor: string;
  backgroundColor: string;
  clear: boolean;
  sizeButton: number;
  positionButton?: 'left' | 'right';
}
