import './StationInput.scss';

import React from 'react';
import PropTypes from 'prop-types';

export default class StationInput extends React.Component {
  renderDropdown () {
    const { stations, selectedStation, onSelect, track } = this.props;

    return (
      <div className="stations">
        {
          stations.map((station, index) => {
            return (
              <button type="button"
                key={station}
                onClick={() => onSelect(track, index)}
                className={`station${index === selectedStation && '-selected'}`}
              >
                {station}
              </button>
            );
          })
        }
      </div>
    );
  }

  render() {
    const { track } = this.props;

    return (
      <div className="station-input">
        <span>{`Starting station for ${track}`}</span>
        {this.renderDropdown()}
      </div>
    );
  }
}

StationInput.propTypes = {
  track: PropTypes.string,
  stations: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func
};
