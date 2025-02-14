import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';

import { FaRegFilePdf } from 'react-icons/fa6';

import PdfViewerSettings, { BasicSettings } from './PdfViewer.settings';

export default {
  craft: {
    displayName: 'PdfViewer',
    sanityCheck: {
      keys: [{ name: 'datasource', require: true, isDatasource: true }],
    },
    requiredFields: {
      keys: ['datasource'],
      all: false,
    },
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(PdfViewerSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'PdfViewer',
    exposed: true,
    icon: FaRegFilePdf,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
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
    ],
    datasources: {
      accept: ['blob', 'string'],
    },
  },
  defaultProps: {
  
  },
} as T4DComponentConfig<IPdfViewerProps>;

export interface IPdfViewerProps extends webforms.ComponentProps {
  
}
