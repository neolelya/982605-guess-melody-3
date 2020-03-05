import {reducer, ActionType, ActionCreator} from './game';

it(`Should reducer return initialState without additional parameters`, () => {
  expect(reducer(void 0, {})).toEqual({
    step: -1,
    mistakes: 0,
    maxMistakesCount: 3,
  });
});

it(`Should reducer increment current step by a given value`, () => {
  expect(
      reducer(
          {
            step: -1,
            mistakes: 0,
            maxMistakesCount: 3,
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
  });
});

it(`Should reducer increment current mistakes by a given value`, () => {
  expect(
      reducer(
          {
            step: -1,
            mistakes: 0,
            maxMistakesCount: 3,
          },
          {
            type: ActionType.INCREMENT_MISTAKES,
            payload: 1,
          }
      )
  ).toEqual({step: -1, mistakes: 1, maxMistakesCount: 3});
});

it(`Shoud reducer work correctly with ActionCreator`, () => {
  expect(ActionCreator.incrementStep()).toEqual({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  });
});

it(`Reducer should return default`, () => {
  expect(
      reducer(
          {
            step: 5,
            mistakes: 1,
          },
          {
            type: ActionType.RESET,
            payload: null,
          }
      )
  ).toEqual({
    step: 0,
    mistakes: 0,
    maxMistakesCount: 3,
  });

  expect(
      reducer(
          {
            step: 0,
            mistakes: 0,
          },
          {
            type: ActionType.RESET,
            payload: null,
          }
      )
  ).toEqual({
    step: 0,
    mistakes: 0,
    maxMistakesCount: 3,
  });

  expect(
      reducer(
          {
            step: -1,
            mistakes: 0,
          },
          {
            type: ActionType.RESET,
            payload: null,
          }
      )
  ).toEqual({
    step: 0,
    mistakes: 0,
    maxMistakesCount: 3,
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

  it(`Action creator for reset game returns action with null payload`, () => {
    expect(ActionCreator.resetGame()).toEqual({
      type: ActionType.RESET,
      payload: null,
    });
  });
});
