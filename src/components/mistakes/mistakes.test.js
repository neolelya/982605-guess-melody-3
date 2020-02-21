import React from 'react';
import renderer from 'react-test-renderer';
import Mistakes from './mistakes.jsx';

describe(`Should Mistakes render correctly`, () => {
  it(`With mistakes count = 0`, () => {
    const tree = renderer.create(<Mistakes count={0} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With mistakes count = 1`, () => {
    const tree = renderer.create(<Mistakes count={1} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
