import {reducer, ActionType, ActionCreator} from './reducer';

const questions = [
  {
    type: `genre`,
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
        genre: `rock`,
      },
    ],
  },
  {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [
      {
        picture: `https://api.adorable.io/avatars/128/A`,
        artist: `John Snow`,
      },
      {
        picture: `https://api.adorable.io/avatars/128/AB`,
        artist: `Jack Daniels`,
      },
      {
        picture: `https://api.adorable.io/avatars/128/AC`,
        artist: `Jim Beam`,
      },
    ],
  },
];

it(`Should reducer return initialState without additional parameters`, () => {
  expect(reducer(void 0, {})).toEqual({
    step: -1,
    mistakes: 0,
    maxMistakesCount: 3,
    questions,
  });
});

it(`Should reducer increment current step by a given value`, () => {
  expect(
      reducer(
          {
            step: -1,
            mistakes: 0,
            maxMistakesCount: 3,
            questions,
          },
          {
            type: ActionType.INCREMENT_STEP,
            payload: 1,
          }
      )
  ).toEqual({
    step: 0,
    mistakes: 0,
    maxMistakesCount: 3,
    questions,
  });
});

it(`Should reducer increment current mistakes by a given value`, () => {
  expect(
      reducer(
          {
            step: -1,
            mistakes: 0,
            maxMistakesCount: 3,
            questions,
          },
          {
            type: ActionType.INCREMENT_MISTAKES,
            payload: 1,
          }
      )
  ).toEqual({step: -1, mistakes: 1, maxMistakesCount: 3, questions});
});

it(`Shoud reducer work correctly with ActionCreator`, () => {
  expect(ActionCreator.incrementStep()).toEqual({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    expect(
        ActionCreator.incrementMistake(
            {
              type: `artist`,
              song: {
                artist: `correct`,
                src: ``,
              },
              answers: [
                {
                  artist: `correct`,
                  picture: ``,
                },
                {
                  artist: `incorrect`,
                  picture: ``,
                },
                {
                  artist: `incorrect-2`,
                  picture: ``,
                },
              ],
            },
            {
              artist: `correct`,
              picture: ``,
            }
        )
    ).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(
        ActionCreator.incrementMistake(
            {
              type: `artist`,
              song: {
                artist: `correct`,
                src: ``,
              },
              answers: [
                {
                  artist: `correct`,
                  picture: ``,
                },
                {
                  artist: `incorrect`,
                  picture: ``,
                },
                {
                  artist: `incorrect-2`,
                  picture: ``,
                },
              ],
            },
            {
              artist: `incorrect`,
              picture: ``,
            }
        )
    ).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    expect(
        ActionCreator.incrementMistake(
            {
              type: `genre`,
              genre: `jazz`,
              answers: [
                {
                  genre: `rock`,
                  src: ``,
                },
                {
                  genre: `jazz`,
                  src: ``,
                },
                {
                  genre: `blues`,
                  src: ``,
                },
                {
                  genre: `blues`,
                  src: ``,
                },
              ],
            },
            [false, true, false, false]
        )
    ).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(
        ActionCreator.incrementMistake(
            {
              type: `genre`,
              genre: `jazz`,
              answers: [
                {
                  genre: `blues`,
                  src: ``,
                },
                {
                  genre: `blues`,
                  src: ``,
                },
                {
                  genre: `blues`,
                  src: ``,
                },
                {
                  genre: `blues`,
                  src: ``,
                },
              ],
            },
            [true, true, true, true]
        )
    ).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });
});
