import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

it(`Render App`, () => {
  const tree = renderer.create(<App errorsCount={5} />).toJSON();

  expect(tree).toMatchSnapshot();
});
