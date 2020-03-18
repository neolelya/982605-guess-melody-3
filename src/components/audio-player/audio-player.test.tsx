import * as React from 'react';
import * as renderer from 'react-test-renderer';
import AudioPlayer from './audio-player';

export const noop = () => {
  //  do nothing
};

it(`Should render AudioPlayer correctly`, () => {
  const tree = renderer
    .create(
        <AudioPlayer
          isPlaying={false}
          onPlayButtonClick={noop}
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
