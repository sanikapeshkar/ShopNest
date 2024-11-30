import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';  
const Button = ({ buttonType, children, onClick, ...rest }) => {
  return (
    <button
      className={`button ${buttonType}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  buttonType: PropTypes.oneOf(['default', 'danger', 'green']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  buttonType: 'default',
  onClick: () => {},
};

export default Button;
