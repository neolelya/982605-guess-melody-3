import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Mistakes from './mistakes';

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
