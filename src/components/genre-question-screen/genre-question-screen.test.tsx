import * as React from 'react';
import * as renderer from 'react-test-renderer';
import GenreQuestionScreen from './genre-question-screen';
import {GameType, QuestionGenre} from '../../types';

export const noop = () => {
  //  do nothing
};

const question: QuestionGenre = {
  type: GameType.GENRE,
  genre: `rock`,
  answers: [
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `jazz`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `pop`,
    },
  ],
};

it(`Should render GenreQuestionScreen correctly`, () => {
  const tree = renderer
    .create(
        <GenreQuestionScreen
          onAnswer={noop}
          question={question}
          renderPlayer={() => null}
          onChange={noop}
          userAnswers={[false, false, false, false]}
        />,
        {
          createNodeMock: () => {
            return {};
          },
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
