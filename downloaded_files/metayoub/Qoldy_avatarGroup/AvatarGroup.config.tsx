import {
  EComponentKind,
  splitDatasourceID,
  T4DComponentConfig,
  T4DComponentDatasourceDeclaration,
} from '@ws-ui/webform-editor';
import {
  Settings,
  isDatasourcePayload,
  getDataTransferSourceID,
  isAttributePayload,
} from '@ws-ui/webform-editor';
import {
  isArrayDatasource,
  isEntitySelectionDatasource,
  isRelatedEntitiesAttribute,
} from '@ws-ui/shared';
import cloneDeep from 'lodash/cloneDeep';

import AvatarGroupSettings, { BasicSettings } from './AvatarGroup.settings';
import { RxAvatar } from 'react-icons/rx';

export default {
  craft: {
    displayName: 'Avatar Group',
    rules: {
      canDrag: () => true,
    },
    kind: EComponentKind.BASIC,
    props: {
      iterable: true,
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(AvatarGroupSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Avatar Group',
    sanityCheck: {
      keys: [{ name: 'datasource', require: true, isDatasource: true }],
    },

    exposed: true,
    icon: RxAvatar,
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
      declarations: (props) => {
        const { image, title, datasource = '' } = props as IAvatarGroupProps;
        const declarations: T4DComponentDatasourceDeclaration[] = [
          { path: datasource, iterable: true },
        ];
        const { id: ds, namespace } = splitDatasourceID(datasource?.trim()) || {};

        if (image) {
          const imageSrc = `${ds}.[].${image}`;
          declarations.push({
            path: namespace ? `${namespace}:${imageSrc}` : imageSrc,
            iterable: true,
          });
        }

        if (title) {
          const titleSrc = `${ds}.[].${title}`;
          declarations.push({
            path: namespace ? `${namespace}:${titleSrc}` : titleSrc,
            iterable: true,
          });
        }
        return declarations;
      },
      set: (nodeId, query, payload) => {
        const new_props = cloneDeep(query.node(nodeId).get().data.props) as IAvatarGroupProps;
        payload.forEach((item) => {
          if (isDatasourcePayload(item)) {
            if (isEntitySelectionDatasource(item.source) || isArrayDatasource(item.source)) {
              new_props.datasource = getDataTransferSourceID(item);
            }
          } else if (isAttributePayload(item)) {
            if (isRelatedEntitiesAttribute(item.attribute)) {
              new_props.datasource = getDataTransferSourceID(item);
            } else {
              if (item.attribute.type === 'image') {
                new_props.image = item.attribute.name || '';
              }
              if (item.attribute.type === 'string') {
                new_props.title = item.attribute.name || '';
              }
            }
          }
        });
        return {
          [nodeId]: new_props,
        };
      },
    },
  },
  defaultProps: {
    maxLength: 10,
    iterableChild: true,
  },
} as T4DComponentConfig<IAvatarGroupProps>;

export interface IAvatarGroupProps extends webforms.ComponentProps {
  maxLength?: number;
  image?: string;
  title?: string;
}
