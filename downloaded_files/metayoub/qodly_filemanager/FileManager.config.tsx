import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlineFolder } from 'react-icons/md';
import FileManagertSettings, { BasicSettings } from './FileManager.settings';

export interface IFileItem {
  name: string;
  type: 'file' | 'folder';
  lastModified?: string;
  size?: number;
  children?: IFileItem[];
}
export interface IFileManagerProps extends webforms.ComponentProps {
  items: IFileItem[];
}

export default {
  craft: {
    displayName: 'File manager',
    sanityCheck: {
      keys: [{ name: 'datasource', require: true, isDatasource: true }],
    },
    requiredFields: {
      keys: ['datasource'],
      all: false,
    },
    kind: EComponentKind.BASIC,
    props: {
      items: [],
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(FileManagertSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'File Manager',
    exposed: true,
    icon: MdOutlineFolder,
    events: [
      {
        label: 'On File Click',
        value: 'onfileclick',
      },
      {
        label: 'On File Right Click',
        value: 'onfilerightclick',
      },
      {
        label: 'On Folder Click',
        value: 'onfolderclick',
      },
    ],
    datasources: {
      accept: ['array'],
    },
  },
  defaultProps: {
    items: [],
    style: {
      display: 'flex',
      height: '100%',
      backgroundColor: 'white',
      borderRadius: '0.25rem',
      borderWidth: '1px',
      borderColor: '#e5e7eb',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  },
} as T4DComponentConfig<IFileManagerProps>;

export interface IFileManagerProps extends webforms.ComponentProps {
  name?: string;
}
