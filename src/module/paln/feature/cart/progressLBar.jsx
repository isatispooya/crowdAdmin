import React from 'react';
import PropTypes from 'prop-types';
import { BsArrow90DegDown } from 'react-icons/bs';

// eslint-disable-next-line arrow-body-style
const ProgressLineChart = ({ progress, label }) => {
  return (
    <div className="w-full flex flex-col items-start space-y-2">
      <label
        htmlFor="progress"
        className="flex items-center justify-center text-lg font-semibold text-gray-700"
      >
        {label}
        <BsArrow90DegDown className="ml-2 text-blue-500" />
      </label>

      <div className="w-full flex items-center space-x-2">
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="ml-5 px-2 text-sm font-medium text-gray-700">{progress}%</span>
      </div>
    </div>
  );
};

ProgressLineChart.propTypes = {
  progress: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default ProgressLineChart;
