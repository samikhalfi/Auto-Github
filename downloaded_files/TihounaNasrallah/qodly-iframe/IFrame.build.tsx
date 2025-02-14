import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, HTMLAttributeReferrerPolicy } from 'react';
import { IIFrameProps } from './IFrame.config';

import { BsFillInfoCircleFill } from 'react-icons/bs';

const IFrame: FC<IIFrameProps> = ({
  datasource,
  referrerpolicy,
  Isandbox = [{ restriction: '' }],
  Ipermissions = [{ permission: '' }],
  name,
  style,
  allowfullscreen,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  let referrerPolicyVar: HTMLAttributeReferrerPolicy = '';
  switch (referrerpolicy) {
    case 'no-referrer-when-downgrade':
      referrerPolicyVar = 'no-referrer-when-downgrade';
      break;
    case 'no-referrer':
      referrerPolicyVar = 'no-referrer';
      break;
    case 'same-origin':
      referrerPolicyVar = 'same-origin';
      break;
    case 'origin':
      referrerPolicyVar = 'origin';
      break;
    case 'origin-when-cross-origin':
      referrerPolicyVar = 'origin-when-cross-origin';
      break;
    case 'strict-origin-when-cross-origin':
      referrerPolicyVar = 'strict-origin-when-cross-origin';
      break;
    case 'unsafe-url':
      referrerPolicyVar = 'unsafe-url';
      break;
    default:
      referrerPolicyVar = '';
  }

  const processArray = (arr: any[], separator = '') => {
    let list: string[] = [];
    arr.forEach((element) => {
      list.push(element.restriction || element.permission);
    });
    return list.join(separator);
  };

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      {datasource ? (
        <div className="w-full h-full p-4">
          &lt;iframe name="{name}" src="${datasource}" height="{style?.height}" width="
          {style?.width} " referrerpolicy="
          {referrerPolicyVar}" sandbox="{processArray(Isandbox, ' ')}" allow="
          {processArray(Ipermissions, ';')}" {allowfullscreen ? 'allowfullscreen' : ''}
          &gt;&lt;/iframe&gt;
        </div>
      ) : (
        <div className="flex h-24 w-full flex-col items-center justify-center gap-2 rounded-lg border bg-purple-400 py-4 text-white">
          <BsFillInfoCircleFill className=" h-6 w-6" />
          <p className=" font-medium">Please attach a datasource</p>
        </div>
      )}
    </div>
  );
};

export default IFrame;
