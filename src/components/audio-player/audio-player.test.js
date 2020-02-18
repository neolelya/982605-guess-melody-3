import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from './audio-player.jsx';
import questions from '../../mocks/questions';

it(`Should render AudioPlayer correctly`, () => {
  const {src} = questions[1].song;

  const tree = renderer
    .create(
        <AudioPlayer isPlaying={false} src={src} onPlayButtonClick={() => {}} />,
        {
          createNodeMock: () => {
            return {};
          },
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
