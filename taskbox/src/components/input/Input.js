
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

export default function Input({ id, label, variant, onClick, onChange }) {
  return (
    <div className={`list-item`}>
      <TextField id={id} label={label} variant={variant} />
    </div>
  );
}

Input.propTypes = {
  /** Composition of the id */
  id: PropTypes.string,
  /** Composition of the label */
  label: PropTypes.string,
  /** Composition of the label */
  variant: 'outlined' | 'filled' | 'standard',
  /** Event to change the task to archived */
  onClick: PropTypes.func,
  /** Event to change the task to pinned */
  onChange: PropTypes.func,
};