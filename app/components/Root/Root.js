import './Root.scss';

import React from 'react';
import { hot } from 'react-hot-loader';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import StationInput from '../StationInput/StationInput';
import Simulator from '../Simulator/Simulator';
import Button from '../Button/Button';

import Tracks from '../../constants/Tracks';
import Stations from '../../constants/Stations';

class Root extends React.Component {
  constructor () {
    super();

    this.state = {
      startingPoints: {
        // by default all trains start from station index 0
        [ Tracks.trackA ]: 0,
        [ Tracks.trackB ]: 0,
        [ Tracks.trackC ]: 0,
      },
      isSimulating: false
    };
  }

  renderStartingPointInputs() {
    const { startingPoints } = this.state;
    const onSelect = (track, stationIndex) =>
      this.setState({
        startingPoints: Object.assign({}, startingPoints, { [track]: stationIndex })
      });

    return Object.values(Tracks).map(track => {
      return (
        <StationInput
          key={track}
          selectedStation={startingPoints[track]}
          stations={ Stations[track] }
          {...{ track, onSelect }}
        />
      );
    });
  }

  renderActionButtons() {
    return (
      <div className="action-buttons">
        <Button key='start' label={'Start'} onClick={() => this.setState({ isSimulating: true })} />
        <Button key='stop' label={'Stop'} onClick={() => this.setState({ isSimulating: false })} />
      </div>
    );
  }

  render() {
    const { isSimulating, startingPoints } = this.state;

    return (
      <ErrorBoundary>
        <div className="root">
          <h2>{'Welcome to railway demo.'}</h2>
          {this.renderStartingPointInputs()}
          {this.renderActionButtons()}
          {isSimulating && <Simulator {...{ isSimulating, startingPoints }} />}
        </div>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(Root);
