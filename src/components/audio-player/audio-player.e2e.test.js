import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, mount} from 'enzyme';
import AudioPlayer from './audio-player.jsx';
import questions from '../../mocks/questions';

configure({adapter: new Adapter()});

it(`Should switch Play and Pause buttons`, () => {
  const {src} = questions[1].song;
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
