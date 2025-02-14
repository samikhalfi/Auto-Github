import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { PiFrameCornersBold } from 'react-icons/pi';

import IFrameSettings, { BasicSettings } from './IFrame.settings';

export default {
  craft: {
    displayName: 'IFrame',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(IFrameSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'IFrame',
    exposed: true,
    icon: PiFrameCornersBold,
    events: [],
    datasources: {
      accept: ['string'],
    },
  },
  defaultProps: {
    name: 'iframe',
    allowfullscreen: true,
    allow: [{ permission: '' }],
    referrerpolicy: 'strict-origin-when-cross-origin',
    sandbox: [{ permission: '' }],
    loading: 'eager',
  },
} as T4DComponentConfig<IIFrameProps>;

export interface IIFrameProps extends webforms.ComponentProps {
  name?: string;
  allowfullscreen?: boolean;
  Ipermissions?: [{ permission: string }];
  referrerpolicy?: string;
  Isandbox?: [{ restriction: string }];
  loading?: 'lazy' | 'eager';
}
