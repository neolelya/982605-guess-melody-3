import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import AudioPlayer from './audio-player';

configure({adapter: new Adapter()});

it(`Should switch Play and Pause buttons`, () => {
  const onPlayButtonClick = jest.fn();

  const player = shallow(
      <AudioPlayer
        isPlaying={true}
        onPlayButtonClick={onPlayButtonClick}
        isLoading={false}
      >
        <audio />
      </AudioPlayer>
  );

  player.find(`.track__button`).simulate(`click`);

  expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
});
