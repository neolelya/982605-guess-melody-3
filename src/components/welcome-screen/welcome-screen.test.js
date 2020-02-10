import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen.jsx';

it(`Should render WelcomeScreen correctly`, () => {
  const tree = renderer
    .create(<WelcomeScreen errorsCount={5} onWelcomeButtonClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
