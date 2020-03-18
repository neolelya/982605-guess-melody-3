import * as React from 'react';
import {shallow, configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen';

configure({
  adapter: new Adapter(),
});

it(`Should welcome button be pressed`, () => {
  const handleWelcomeButtonClick = jest.fn();

  const welcomeScreen = shallow(
      <WelcomeScreen
        errorsCount={5}
        onWelcomeButtonClick={handleWelcomeButtonClick}
      />
  );

  const welcomeButton = welcomeScreen.find(`button.welcome__button`);

  welcomeButton.props().onClick();

  expect(handleWelcomeButtonClick.mock.calls.length).toBe(1);
});
