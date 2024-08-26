import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
  return (
    <div className="loading-container">
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  );
};

export default Loading;