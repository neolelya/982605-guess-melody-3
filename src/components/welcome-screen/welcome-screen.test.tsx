import * as React from 'react';
import * as renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen';

export const noop = () => {
  //  do nothing
};

it(`Should render WelcomeScreen correctly`, () => {
  const tree = renderer
    .create(<WelcomeScreen errorsCount={5} onWelcomeButtonClick={noop} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
