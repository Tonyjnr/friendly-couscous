import React from 'react';
import PropTypes from 'prop-types';
import { useThemeContext } from '../../context/ThemeContext';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const { getColorClasses, darkMode } = useThemeContext();

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    xl: 'px-6 py-3 text-lg'
  };
  
  const variantClasses = {
    primary: `${getColorClasses('primary')} ${getColorClasses('hover')} text-white focus:ring-blue-500`,
    secondary: `bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 focus:ring-gray-500`,
    outline: `border ${getColorClasses('border')} ${getColorClasses('text')} bg-transparent hover:bg-opacity-10 hover:bg-blue-600 focus:ring-blue-500`,
    ghost: `${getColorClasses('text')} hover:bg-blue-100 dark:hover:bg-blue-900 dark:hover:bg-opacity-20 focus:ring-blue-500`,
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
  };
  
  const disabledClasses = 'opacity-60 cursor-not-allowed';
  const fullWidthClasses = 'w-full';
  
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? disabledClasses : ''}
    ${fullWidth ? fullWidthClasses : ''}
    ${darkMode ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}
    ${className}
  `;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={`${children ? 'ml-2' : ''}`}>{icon}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger', 'success']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;