import {NameSpace} from '../name-space';

export const getUser = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};
