import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import {GameScreen} from './game-screen.tsx';
import {GameType} from '../../const';
import history from '../../history';

const Child = {
  ARTIST: <div className="children-component">Artist component</div>,
  GENRE: <div className="children-component">Genre component</div>,
};

describe(`Should render GameScreen correctly`, () => {
  it(`with ArtistQuestionScreen`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <GameScreen type={GameType.ARTIST} mistakes={3} goWelcome={() => {}}>
              {Child.ARTIST}
            </GameScreen>
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with GenreQuestionScreen`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <GameScreen type={GameType.GENRE} mistakes={3} goWelcome={() => {}}>
              {Child.GENRE}
            </GameScreen>
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
