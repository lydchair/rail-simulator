import Tracks from './tracks.js';

export const SINGLE_TRACK_STATIONS = [
  'start_station',
  'station1',
  'station2',
  'station3',
  'station4',
  'end_station'
];

const STATIONS = Object.keys(Tracks).reduce((acc, key) => {
  acc[key] = SINGLE_TRACK_STATIONS;

  return acc;
}, {});

export const STATION_POSITIONS = {
  [Tracks.trackA]: [
    [10, 30], [20, 30], [30, 30], [40, 30], [50, 30], [60, 30], [70, 30]
  ],
  [Tracks.trackB]: [
    [25, 19], [30, 30], [35, 41], [40, 52], [45, 63], [50, 74], [55, 85]
  ],
  [Tracks.trackC]: [
    [25, 85], [30, 74], [35, 63], [40, 52], [45, 41], [50, 30], [55, 19]
  ]
};

export default STATIONS;
