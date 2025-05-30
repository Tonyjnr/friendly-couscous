import React from 'react';
import PropTypes from 'prop-types';
import { useThemeContext } from '../../context/ThemeContext';

const Card = ({ 
  children, 
  className = '', 
  title,
  subtitle,
  headerAction,
  footer,
  noPadding = false,
  borderColor,
  ...props 
}) => {
  const { darkMode } = useThemeContext();
  
  const baseClasses = 'rounded-lg shadow-sm overflow-hidden';
  const bgClasses = darkMode ? 'bg-gray-800 text-white' : 'bg-white';
  const borderClasses = borderColor ? `border-t-4 ${borderColor}` : '';
  
  const cardClasses = `
    ${baseClasses}
    ${bgClasses}
    ${borderClasses}
    ${className}
  `;

  return (
    <div className={cardClasses} {...props}>
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
          <div>
            {title && <h3 className="text-lg font-medium">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-4'}>
        {children}
      </div>
      
      {footer && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  headerAction: PropTypes.node,
  footer: PropTypes.node,
  noPadding: PropTypes.bool,
  borderColor: PropTypes.string,
};

export default Card;