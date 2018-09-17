import './Button.scss';

import React from 'react';

export default function Button (props) {
  const { label } = props;

  return (
    <div className={'container'}>
      <button type="button" className={'button'} {...props}>
        {label}
      </button>
    </div>
  );
}
