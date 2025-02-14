import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';

import { IVideoPlayerProps } from './VideoPlayer.config';
import { BsFillPlayFill, BsFillVolumeUpFill, BsFullscreen } from 'react-icons/bs';

import { RiPictureInPicture2Fill, RiSpeedUpFill } from 'react-icons/ri';
import { TbRewindBackward10, TbRewindForward10 } from 'react-icons/tb';

const VideoPlayer: FC<IVideoPlayerProps> = ({
  autoPlay,
  loop,
  muted,
  miniPlayer,
  fullScreen,
  speed,
  fastBackForward,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  //playPause button
  const VideoPlayPauseButton = () => {
    return (
      <button
        className={cn(
          'player-start',
          'p-2 my-1 rounded-full flex justify-center items-center w-12 h-12',
        )}
      >
        {' '}
        {<BsFillPlayFill />}
      </button>
    );
  };
  //progress bar
  const ProgressBar = () => {
    return (
      <div className={cn('player-progress', 'grow gap-1')}>
        <input className={cn('player-input', 'w-full')} type="range" min="0" max="100" />
      </div>
    );
  };
  //volume slider
  const VolumeInput = () => {
    return (
      <div className={cn('player-volume-container', 'flex group w-fit')}>
        <button
          className={cn(
            'player-volume-button',
            'items-center justify-center p-2 block cursor-pointer relative',
          )}
        >
          <BsFillVolumeUpFill />
        </button>
        <input type="range" min={0} max={100} className={cn('player-volume-range', 'w-fit')} />
      </div>
    );
  };

  const FullScreenButton = () => {
    return (
      <>
        {fullScreen && (
          <button
            className={cn(
              'player-fullscreen',
              'p-2 my-1 rounded-full flex justify-center items-center w-12 h-12',
            )}
          >
            <BsFullscreen />
          </button>
        )}
      </>
    );
  };

  const PictureInPictureButton = () => {
    return (
      <>
        {miniPlayer && (
          <button
            className={cn(
              'player-miniPlayer',
              'p-2 my-1 rounded-full  flex justify-center items-center w-12 h-12',
            )}
          >
            <RiPictureInPicture2Fill />
          </button>
        )}
      </>
    );
  };

  const SpeedButton = () => {
    return (
      <>
        {speed && (
          <div className="relative">
            <button
              className={cn(
                'player-speed',
                'p-2 my-1 rounded-full flex justify-center items-center w-12 h-12',
              )}
            >
              <RiSpeedUpFill />
            </button>
            <div
              className={cn(
                'player-speed-options',
                'absolute bottom-full left-1/2 transform -translate-x-1/2 z-10 text-black rounded shadow mb-2 bg-white',
              )}
            >
              <button className="block w-full py-2 px-4 text-left hover:text-gray-300">
                0.25x
              </button>
              <button className="block w-full py-2 px-4 text-left hover:text-gray-300">0.5x</button>
              <button className="block w-full py-2 px-4 text-left hover:text-gray-300">1x</button>
              <button className="block w-full py-2 px-4 text-left hover:text-gray-300">1.5x</button>
              <button className="block w-full py-2 px-4 text-left hover:text-gray-300">2x</button>
            </div>
          </div>
        )}
      </>
    );
  };

  //duration div
  const DurationDiv = () => {
    const dur = '00:00 / 00:00';
    return <div className={cn('duration-container', 'p-2 w-50')}>{dur}</div>;
  };

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div className={cn('video-player-container', 'relative w-full h-full')}>
        <video
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          className={cn('video-screen', 'w-full bg-black rounded-lg')}
        >
          <source src="" type="video/mp4" />
          <source src="" type="video/ogg" />
          Your browser does not support the video element.
        </video>
        <div
          className={cn(
            'video-container',
            'w-full absolute bottom-0 left-0 right-0',
            'flex bg-transparent text-white text-xl px-1',
          )}
        >
          <>
            {fastBackForward && (
              <button
                className={cn(
                  'player-fast',
                  'p-2 my-1 rounded-full flex justify-center items-center w-12 h-12',
                )}
              >
                <TbRewindBackward10 />
              </button>
            )}
          </>
          <VideoPlayPauseButton />
          <>
            {fastBackForward && (
              <button
                className={cn(
                  'player-fast',
                  'p-2 my-1 rounded-full flex justify-center items-center w-12 h-12',
                )}
              >
                <TbRewindForward10 />
              </button>
            )}
          </>{' '}
          <div
            className={cn('player-container', 'flex grow items-center justify-center gap-2 p-1')}
          >
            <ProgressBar />
            <DurationDiv />
          </div>
          <VolumeInput />
          <SpeedButton />
          <FullScreenButton />
          <PictureInPictureButton />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
