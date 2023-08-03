import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setDialog } from 'redux/slices/modalSlice.js';
import PropTypes from 'prop-types';
import { settings } from 'controllers/index';

function TurnOffButton({ className }) {
  const dispatch = useDispatch();

  const close = useCallback(() => {
    localStorage.clear('jwt');
    settings.closeApp(localStorage.getItem('jwt'));
  }, []);

  return (
    <button type="button" onClick={() => dispatch(setDialog(['Confirm', { action: close, description: 'You are about to close the application.' }]))} className={`btn ${className || 'btn-danger'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-escape" viewBox="0 0 16 16">
        <path d="M8.538 1.02a.5.5 0 1 0-.076.998 6 6 0 1 1-6.445 6.444.5.5 0 0 0-.997.076A7 7 0 1 0 8.538 1.02Z" />
        <path d="M7.096 7.828a.5.5 0 0 0 .707-.707L2.707 2.025h2.768a.5.5 0 1 0 0-1H1.5a.5.5 0 0 0-.5.5V5.5a.5.5 0 0 0 1 0V2.732l5.096 5.096Z" />
      </svg>
    </button>
  );
}

TurnOffButton.propTypes = {
  className: PropTypes.string,
};

TurnOffButton.defaultProps = {
  className: false,
};

export default TurnOffButton;
