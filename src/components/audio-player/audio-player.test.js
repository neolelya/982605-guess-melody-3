import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from './audio-player.tsx';

it(`Should render AudioPlayer correctly`, () => {
  const src = `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`;

  const tree = renderer
    .create(
        <AudioPlayer
          isPlaying={false}
          src={src}
          onPlayButtonClick={() => {}}
          isLoading={true}
        >
          <audio />
        </AudioPlayer>,
        {
          createNodeMock: () => {
            return {};
          },
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
