import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, HTMLAttributeReferrerPolicy, useEffect, useState } from 'react';

import { BsFillInfoCircleFill } from 'react-icons/bs';

import { IIFrameProps } from './IFrame.config';

const IFrame: FC<IIFrameProps> = ({
  datasource,
  name,
  allowfullscreen,
  Ipermissions = [{ permission: '' }],
  referrerpolicy,
  Isandbox = [{ restriction: '' }],
  loading,
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState(() => name);
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const listener = async () => {
      const v = await ds.getValue<string>();
      setValue(v);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
  }, [ds]);

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

  let list: string[] = [];
  const processArray = (arr: any[], separator = '') => {
    arr.forEach((element) => {
      list.push(element.restriction);
    });
    return list.join(separator);
  };

  return (
    <span ref={connect} style={style} className={cn(className, classNames)}>
      {datasource && value ? (
        <iframe
          style={{ border: 'solid 1px gray' }}
          name={value}
          src={value}
          height={style?.height}
          width={style?.width}
          allow={processArray(Ipermissions, ';')}
          allowFullScreen={allowfullscreen}
          referrerPolicy={referrerPolicyVar}
          sandbox={processArray(Isandbox, ' ')}
          loading={loading}
        />
      ) : (
        <div className="text-red-500 font-semibold w-full h-28 border-2 rounded-lg border-red-500 flex flex-col justify-center items-center gap-2">
          <BsFillInfoCircleFill className="text-3xl" />
          <p className="ml-2">
            {value ? "Please set the 'Datasource' property" : `No such datasource: '${datasource}'`}
          </p>
        </div>
      )}
    </span>
  );
};

export default IFrame;
