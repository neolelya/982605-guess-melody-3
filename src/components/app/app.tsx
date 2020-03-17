import * as React from 'react';
import PropTypes from 'prop-types';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/game/game';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import GameScreen from '../game-screen/game-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import WinScreen from '../win-screen/win-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer';
import AuthorizationScreen from '../authorization-screen/authorization-screen';
import {PrivateRoute} from '../private-route/private-route';
import {GameType, AppRoute} from '../../const';
import {
  getStep,
  getMistakes,
  getMaxMistakes,
} from '../../reducer/game/selectors';
import {getQuestions} from '../../reducer/data/selectors';
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import {
  AuthorizationStatus,
  Operation as UserOperation,
} from '../../reducer/user/user';
import history from '../../history';

const GenreQuestionScreenWrapped = withActivePlayer(
    withUserAnswer(GenreQuestionScreen)
);
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

class App extends React.PureComponent {
  _renderGameScreen() {
    const {
      authorizationStatus,
      maxMistakesCount,
      mistakes,
      questions,
      step,
      onUserAnswer,
      onWelcomeButtonClick,
    } = this.props;
    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakesCount}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakesCount) {
      return history.push(AppRoute.LOSE);
    }

    if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus) {
        return history.push(AppRoute.RESULT);
      } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return history.push(AppRoute.LOGIN);
      }
      return null;
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen type={question.type}>
              <ArtistQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen type={question.type}>
              <GenreQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {
      questions,
      mistakes,
      resetGame,
      login,
      authorizationStatus,
    } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderGameScreen()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <AuthorizationScreen
              onSubmit={login}
              onReplayButtonClick={resetGame}
            />
          </Route>
          <Route exact path={AppRoute.LOSE}>
            <GameOverScreen onReplayButtonClick={resetGame} />
          </Route>
          <PrivateRoute
            exact
            path={AppRoute.RESULT}
            authorizationStatus={authorizationStatus}
            render={() => {
              return (
                <WinScreen
                  questionsCount={questions.length}
                  mistakesCount={mistakes}
                  onReplayButtonClick={resetGame}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  login: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  maxMistakesCount: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  step: getStep(state),
  maxMistakesCount: getMaxMistakes(state),
  mistakes: getMistakes(state),
  questions: getQuestions(state),
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistake(question, answer));
    dispatch(ActionCreator.incrementStep());
  },
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
