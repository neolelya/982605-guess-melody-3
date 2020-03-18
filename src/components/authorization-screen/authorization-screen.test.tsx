import * as React from 'react';
import * as renderer from 'react-test-renderer';
import AuthorizationScreen from './authorization-screen';

export const noop = () => {
  //  do nothing
};

it(`Should AuthorizationScreen render correctly`, () => {
  const tree = renderer
    .create(
        <AuthorizationScreen onSubmit={noop} onReplayButtonClick={noop} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
