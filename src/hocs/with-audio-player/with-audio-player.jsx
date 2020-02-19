import React, {PureComponent} from 'react';
import AudioPlayer from '../../components/audio-player/audio-player.jsx';

const withAudioPlayer = (Component) => {
  class WithAudioPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerID: 0,
      };
    }

    render() {
      const {activePlayerID} = this.state;

      return (
        <Component
          {...this.props}
          renderPlayer={(src, id) => {
            return (
              <AudioPlayer
                isPlaying={id === activePlayerID}
                src={src}
                onPlayButtonClick={() =>
                  this.setState({
                    activePlayerID: activePlayerID === id ? -1 : id,
                  })
                }
              />
            );
          }}
        />
      );
    }
  }
  WithAudioPlayer.propTypes = {};

  return WithAudioPlayer;
};

export default withAudioPlayer;
