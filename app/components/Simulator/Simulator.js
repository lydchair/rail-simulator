import './Simulator.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { STATION_POSITIONS } from '../../constants/Stations';
import Tracks from '../../constants/Tracks';

const TRAIN_COLORS = {
  [Tracks.trackA]: 'red',
  [Tracks.trackB]: 'green',
  [Tracks.trackC]: 'blue',
};

const STATION_COLOR = 'black';

const INIT_DIRECTIONS = {
  [Tracks.trackA]: 0,
  [Tracks.trackB]: 0,
  [Tracks.trackC]: 0,
};

const SINGLE_STATION_TRAVEL_TIME_IN_MILLIS = 2000;

export default class Simulator extends React.Component {
  constructor(props) {
    super(props);

    this.interval;
    this.travelDirections = INIT_DIRECTIONS;
    this.positions = props.startingPoints;
  }

  componentDidMount() {
    this.initCanvas();
    this.startSimulation();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setTrains (ctx, startingPoints) {
    return Object.keys(startingPoints).forEach(track => {
      const station = STATION_POSITIONS[track][startingPoints[track]];

      ctx.fillStyle = TRAIN_COLORS[track];
      // here multi 4 and 5 is just to render the pin nicely.
      ctx.fillRect(station[0] * 5, station[1] * 4, 10, 10);
    });
  }

  initStations (ctx) {
    return Object.values(STATION_POSITIONS).forEach(positions => {
      positions.forEach(position => {
        ctx.fillStyle = STATION_COLOR;
        // here multi 4 and 5 is just to render the pin nicely.
        ctx.fillRect(position[0] * 5, position[1] * 4, 5, 5);
      });
    });
  }

  initCanvas () {
    const { startingPoints } = this.props;
    // eslint-disable-next-line
    const ctx = this.refs.canvas.getContext('2d');

    ctx.clearRect(0,0, 600, 600);

    // draw stations
    this.initStations(ctx);
    this.setTrains(ctx, startingPoints);
  }

  updateCanvas (positions) {
    // eslint-disable-next-line
    const ctx = this.refs.canvas.getContext('2d');

    ctx.clearRect(0,0, 600, 600);

    // draw stations
    this.initStations(ctx);
    this.setTrains(ctx, positions);
  }

  startSimulation () {
    this.interval = setInterval(() => {
      // move trains to next station
      const { positions, travelDirections } =
        moveTrains(this.travelDirections, this.positions);

      this.positions = positions;
      this.travelDirections = travelDirections;

      // check if there is 2 trains arrives at the same location
      checkTrainsMeet(positions);

      // update the canvas
      this.updateCanvas(positions);
    }, SINGLE_STATION_TRAVEL_TIME_IN_MILLIS);
  }

  render() {
    // eslint-disable-next-line
    return <canvas ref="canvas" width={600} height={600} />;
  }
}

Simulator.propTypes = {
  startingPoints: PropTypes.object
};

function moveTrains(travelDirections, positions) {
  const nextPositions = {};
  let nextTravelDirections;

  Object.keys(positions)
    .forEach(track => {
      const currentPosition = positions[track];
      const currentDirection = travelDirections[track];

      let nextPosition;
      let nextDirection = currentDirection;

      if (currentPosition === 0 || currentPosition === 6) {
        nextDirection = !currentDirection;
        nextTravelDirections =
          Object.assign({}, travelDirections, { [track]: nextDirection });
      }
      if (nextDirection) {
        nextPosition = currentPosition + 1;
      } else {
        nextPosition = currentPosition - 1;
      }

      nextPositions[track] = nextPosition;
    });

  return {
    positions: nextPositions,
    travelDirections: nextTravelDirections || travelDirections
  };
}

function checkTrainsMeet (position = {}) {
  const stationPosition = Object.keys(position).map(track => {
    return {
      track,
      position: STATION_POSITIONS[track][position[track]]
    };
  });
  let trainsMeet = [];

  stationPosition.forEach(stationPositionA => {
    stationPosition.forEach(stationPositionB => {
      if (stationPositionA.position[0] === stationPositionB.position[0] &&
        stationPositionA.position[1] === stationPositionB.position[1] &&
        stationPositionA.track !== stationPositionB.track) {
        trainsMeet = [stationPositionA.track, stationPositionB.track];
      }
    });
  });

  if (trainsMeet.length) {
    // if there are trains meet, simulate the passenger number at that time
    // and log in console for avoid collision
    const firstTrainPassengerNumber = Math.floor(Math.random() * 100);
    const secondTrainPassengerNumber = Math.floor(Math.random() * 100);
    const firstPassTrain = firstTrainPassengerNumber > secondTrainPassengerNumber
      ? trainsMeet[0]
      : trainsMeet[1];

    console.log(
      `Rail ${trainsMeet[0]} met Rail ${trainsMeet[1]}.`,
      `${trainsMeet[0]} has passenger number ${firstTrainPassengerNumber}.`,
      `${trainsMeet[1]} has passenger number ${secondTrainPassengerNumber}.`,
      `${firstPassTrain} pass the station first.`
    );
  }
}
