import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useThemeContext } from '../../context/ThemeContext';

const Checkbox = forwardRef(({
  label,
  id,
  name,
  checked,
  onChange,
  disabled = false,
  required = false,
  error,
  helperText,
  className = '',
  ...props
}, ref) => {
  const { getColorClasses } = useThemeContext();
  
  const baseCheckboxClasses = 'h-5 w-5 rounded border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
  const stateClasses = error
    ? 'border-red-300 text-red-600 focus:ring-red-500'
    : `border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600`;
  
  const disabledClasses = 'opacity-60 cursor-not-allowed';
  
  const checkboxClasses = `
    ${baseCheckboxClasses}
    ${stateClasses}
    ${disabled ? disabledClasses : ''}
  `;

  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          ref={ref}
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={checkboxClasses}
          {...props}
        />
      </div>
      
      {label && (
        <div className="ml-3 text-sm">
          <label 
            htmlFor={id} 
            className={`font-medium ${disabled ? 'text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
          
          {helperText && (
            <p className="text-gray-500 dark:text-gray-400">{helperText}</p>
          )}
          
          {error && (
            <p className="text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  label: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
};

export default Checkbox;