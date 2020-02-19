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
      />
  );

  window.HTMLMediaElement.prototype.play = () => {};
  window.HTMLMediaElement.prototype.pause = () => {};

  const button = player.find(`.track__button`);

  expect(player.find(`.track__button--pause`)).toHaveLength(1);

  player.setState({isLoading: false});
  button.simulate(`click`);

  expect(player.find(`.track__button--play`)).toHaveLength(1);
});
