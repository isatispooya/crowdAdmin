import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { IoKey } from 'react-icons/io5';
import { motion } from 'framer-motion';

const Refresh = ({ setShowRefresh }) => {
  const [value, setValue] = useState('');

  const handleClose = () => {
    setShowRefresh(false);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 backdrop-blur-sm bg-white/30 opacity-50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="relative bg-white w-96 shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">کد تایید</h2>

          <button
            type="button"
            className="absolute top-3 left-3 text-red-500 hover:text-gray-800 focus:outline-none"
            onClick={handleClose}
          >
            <AiOutlineClose size={24} />
          </button>

          <div className="mt-5">
            <label htmlFor="otp" className="flex items-center gap-2 mb-4">
              <IoKey className="text-2xl text-gray-600" />
              <input
                type="text"
                id="otp"
                value={value}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="کد تایید را وارد کنید"
              />
            </label>

            <button
              type="button"
              className="w-full py-2 mt-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              تایید
            </button>

            <button
              type="button"
              className="w-full py-2 mt-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              ارسال مجدد
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

Refresh.propTypes = {
  setShowRefresh: PropTypes.func.isRequired,
};

export default Refresh;
