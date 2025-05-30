import React from 'react';
import PropTypes from 'prop-types';
import { useThemeContext } from '../../context/ThemeContext';

const ProgressBar = ({
  value = 0,
  max = 100,
  height = 'h-2',
  color,
  showLabel = false,
  labelPosition = 'right',
  className = '',
  ...props
}) => {
  const { getColorClasses } = useThemeContext();
  
  // Calculate percentage
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  // Determine color based on value or use provided color
  const getProgressColor = () => {
    if (color) return color;
    
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const progressColor = getProgressColor();
  
  return (
    <div className={`flex items-center ${className}`} {...props}>
      {showLabel && labelPosition === 'left' && (
        <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {percentage.toFixed(0)}%
        </span>
      )}
      
      <div className={`flex-grow bg-gray-200 dark:bg-gray-700 rounded-full ${height}`}>
        <div
          className={`${progressColor} rounded-full transition-all duration-300 ease-in-out ${height}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax={max}
        ></div>
      </div>
      
      {showLabel && labelPosition === 'right' && (
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {percentage.toFixed(0)}%
        </span>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  height: PropTypes.string,
  color: PropTypes.string,
  showLabel: PropTypes.bool,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
};

export default ProgressBar;