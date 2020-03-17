import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, mount} from 'enzyme';
import AudioPlayer from './audio-player.tsx';

configure({adapter: new Adapter()});

it(`Should switch Play and Pause buttons`, () => {
  const src = `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`;
  const onPlayButtonClick = jest.fn();

  const player = mount(
      <AudioPlayer
        isPlaying={true}
        src={src}
        onPlayButtonClick={onPlayButtonClick}
        isLoading={false}
      >
        <audio />
      </AudioPlayer>
  );

  window.HTMLMediaElement.prototype.play = () => {};
  window.HTMLMediaElement.prototype.pause = () => {};

  const button = player.find(`.track__button`);

  expect(player.find(`.track__button--pause`)).toHaveLength(1);

  button.simulate(`click`);

  // player.instance().forceUpdate(() => button.simulate(`click`));
  // console.log(button.html());

  expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
});
