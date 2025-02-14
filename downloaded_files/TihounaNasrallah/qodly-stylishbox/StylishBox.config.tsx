import {
  EComponentKind,
  T4DComponentConfig,
  T4DComponentDatasourceDeclaration,
} from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { BsBoundingBoxCircles } from 'react-icons/bs';

import StylishBoxSettings, { BasicSettings } from './StylishBox.settings';

export default {
  craft: {
    displayName: 'StylishBox',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(StylishBoxSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'StylishBox',
    exposed: true,
    icon: BsBoundingBoxCircles,
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
    ],
    datasources: {
      accept: ['entitySel', 'array'],
      declarations: (props: any) => {
        const { parameters } = props;
        const declarations: T4DComponentDatasourceDeclaration[] = [];

        parameters?.forEach((param: IParameters) => {
          declarations.push({
            path: param.source,
            iterable: true,
          });
        });
        return declarations;
      },
    },
  },
  defaultProps: {
    iterableChild: true,
  },
} as T4DComponentConfig<IStylishBoxProps>;

export interface IStylishBoxProps extends webforms.ComponentProps {
  parameters: IParameters[];
}

export interface IParameters {
  name: string;
  source: string;
  defaultValue?: string;
}
