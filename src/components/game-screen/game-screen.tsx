import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Mistakes from '../mistakes/mistakes';
import {GameType} from '../../const';
import {getMistakes} from '../../reducer/game/selectors';
import {ActionCreator} from '../../reducer/game/game';
import {AppRoute} from '../../const';

const GameScreen = (props) => {
  const {type, children, mistakes, goWelcome} = props;

  return (
    <section className={`game game--${type}`}>
      <header className="game__header">
        <Link to={AppRoute.ROOT} className="game__back" onClick={goWelcome}>
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img
            className="game__logo"
            src="img/melody-logo-ginger.png"
            alt="Угадай мелодию"
          />
        </Link>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="timer"
          viewBox="0 0 780 780"
        >
          <circle
            className="timer__line"
            cx="390"
            cy="390"
            r="370"
            style={{
              filter: `url(#blur)`,
              transform: `rotate(-90deg) scaleY(-1)`,
              transformOrigin: `center`,
            }}
          />
        </svg>

        <div className="game__mistakes">
          <Mistakes count={mistakes} />
        </div>
      </header>

      {children}
    </section>
  );
};

GameScreen.propTypes = {
  type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  mistakes: PropTypes.number.isRequired,
  goWelcome: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  goWelcome() {
    dispatch(ActionCreator.goWelcome());
  },
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
