import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestionItem from './genre-question-item.tsx';

const answer = {
  src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  genre: `rock`,
};

it(`Should render GenreQuestionItemCorrectly`, () => {
  const tree = renderer
    .create(
        <GenreQuestionItem
          answer={answer}
          id={0}
          onChange={() => {}}
          renderPlayer={() => {}}
          userAnswer={false}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
