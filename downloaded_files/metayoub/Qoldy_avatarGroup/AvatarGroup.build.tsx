import cn from 'classnames';
import { IAvatarGroupProps } from './AvatarGroup.config';
import { useEnhancedNode, useDatasourceSub } from '@ws-ui/webform-editor';
import { FC, CSSProperties } from 'react';

const AvatarGroup: FC<IAvatarGroupProps> = ({
  style,
  className,
  classNames = [],
  maxLength = 3,
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();
  useDatasourceSub();

  // calculate the marginRight
  const avatarStyle: CSSProperties = {
    marginRight: style?.marginRight || '-40px',
    borderWidth: style?.borderWidth || '3px',
    borderColor: style?.borderColor || 'white',
    borderStyle: style?.borderStyle || 'solid',
    marginLeft: style?.marginLeft || '0px',
    display: style?.display || 'flex',
    justifyContent: style?.justifyContent || 'center',
    alignItems: style?.alignItems || 'center',
    width: style?.width || style?.height || '100px',
    height: style?.height || style?.width || '100px',
    borderRadius: style?.borderRadius || '50%',
    backgroundColor: style?.backgroundColor || '#E6EAF4',
    color: style?.color || '#767B87',
    fontSize: style?.fontSize || '24px',
  };

  const avatarsCol = [
    {
      name: 'John Doe',
      image: '',
    },
    {
      name: 'John Doe',
      image: '',
    },
    {
      name: 'John Doe',
      image: '',
    },
  ];

  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length > 2) {
      const haveMiddleName = words
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 4);
      const resultInitialName = haveMiddleName.split('');
      return `${resultInitialName[0]}${resultInitialName[resultInitialName.length - 1]}`;
    }
    return words
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  const renderAvatars = () => {
    const remainingCount = avatarsCol.length - maxLength;
    const avatarsToRender = avatarsCol.slice(0, maxLength);
    const avatars = avatarsToRender.map(({ name, image }, index) => {
      const initials = getInitials(name);

      return (
        <div key={`avatar-${index}`} className="inline-block" data-testid="avatar-initial">
          {image ? (
            <div
              style={{
                ...avatarStyle,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                color: 'transparent',
              }}
              data-testid="avatar-initial-text"
            >
              {initials}
            </div>
          ) : (
            <div style={avatarStyle} data-testid="avatar-initial-text">
              {initials}
            </div>
          )}
        </div>
      );
    });

    if (remainingCount > 0) {
      avatars.push(
        <div key="avatar-remaining" data-testid="avatar-initial-text" className="inline-block">
          <div data-testid="avatar-initial-item" style={avatarStyle}>
            +{remainingCount}
          </div>
        </div>,
      );
    }

    return avatars;
  };

  return (
    <div ref={connect} className={cn(className, classNames)}>
      {renderAvatars()}
    </div>
  );
};

export default AvatarGroup;
