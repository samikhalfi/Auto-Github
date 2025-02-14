import { Element } from '@ws-ui/craftjs-core';
import { FC } from 'react';

export interface ILayoutElementProps {
  resolver: any;
  id: string;
}
const LayoutElement: FC<ILayoutElementProps> = ({ resolver, id }) => {
  return (
    <Element
      id={`panel-${id}`}
      className="h-full w-full"
      role="card-header"
      is={resolver.StyleBox}
      deletable={false}
      canvas
    />
  );
};

export default LayoutElement;
