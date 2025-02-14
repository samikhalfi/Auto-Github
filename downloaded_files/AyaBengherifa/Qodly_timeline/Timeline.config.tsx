import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaTimeline } from 'react-icons/fa6';
import TimelineSettings, { BasicSettings } from './Timeline.settings';

export default {
  craft: {
    rules: {
      canMoveIn: () => true,
      canMoveOut: () => true,
    },
    sanityCheck: {
      keys: [{ name: 'datasource', require: true, isDatasource: true }],
    },
    requiredFields: {
      keys: ['datasource'],
      all: false,
    },
    displayName: 'Timeline',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(TimelineSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Timeline',
    exposed: true,
    icon: FaTimeline,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
    ],
    datasources: {
      accept: ['entitysel', 'entity'],
    },
  },
  defaultProps: {
    style: {
      height: '150px',
    },
    iterable: true,
    name: '',
    variant: 'value1',

    orientation: 'Vertical',
  },
} as T4DComponentConfig<ITimelineProps>;

export interface ITimelineProps extends webforms.ComponentProps {
  name?: string;
  variant?: string;

  orientation?: 'Vertical' | 'Horizontal' | '';
}
