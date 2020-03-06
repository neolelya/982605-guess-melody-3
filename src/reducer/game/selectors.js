import {NameSpace} from '../name-space';

export const getStep = (state) => {
  return state[NameSpace.GAME].step;
};

export const getMistakes = (state) => {
  return state[NameSpace.GAME].mistakes;
};

export const getMaxMistakes = (state) => {
  return state[NameSpace.GAME].maxMistakesCount;
};
