import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdQrCode2 } from 'react-icons/md';

import QrCodeSettings, { BasicSettings } from './QrCode.settings';

export default {
  craft: {
    displayName: 'QrCode',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(QrCodeSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'QrCode',
    exposed: true,
    icon: MdQrCode2,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
    ],
    datasources: {
      accept: ['string'],
    },
  },
  defaultProps: {
    Qrsize: 128,
    QrfgColor: '#000000',
    QrbgColor: '#FFFFFF',
    level: 'L',
    includeMargin: false,
    iterableChild: true,
    excavate: false,
    heightImage: 20,
    widthImage: 20,
  },
} as T4DComponentConfig<IQrCodeProps>;

export interface IQrCodeProps extends webforms.ComponentProps {
  link: string;
  level: string;
  Qrsize: number;
  QrfgColor: string;
  QrbgColor: string;
  includeMargin: boolean;
  src: string;
  heightImage: number;
  widthImage: number;
  excavate: boolean;
}
