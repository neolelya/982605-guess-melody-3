import React from 'react';
import renderer from 'react-test-renderer';
import {GameScreen} from './game-screen.jsx';
import {GameType} from '../../const';

const Child = {
  ARTIST: <div className="children-component">Artist component</div>,
  GENRE: <div className="children-component">Genre component</div>,
};

describe(`Should render GameScreen correctly`, () => {
  it(`with ArtistQuestionScreen`, () => {
    const tree = renderer
      .create(
          <GameScreen type={GameType.ARTIST} mistakes={3}>
            {Child.ARTIST}
          </GameScreen>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with GenreQuestionScreen`, () => {
    const tree = renderer
      .create(
          <GameScreen type={GameType.GENRE} mistakes={3}>
            {Child.GENRE}
          </GameScreen>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
