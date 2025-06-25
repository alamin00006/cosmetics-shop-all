import React from 'react';
import Container from '../Container/Container';
import { FaEnvelope } from 'react-icons/fa';

const Subscribe: React.FC = () => {
  return (
    <div className="bg-[#fafaf5] py-20">
      <Container className={" "}>
        <div className="flex justify-center mb-4">
          <FaEnvelope className="w-10 h-10 text-gray-600" />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 text-center">
          Don’t miss an update!
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 text-center">
          The latest product drops, offers, and stories straight to your phone, plus 20% off your next order
        </p>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="*Enter your email"
            className="w-full sm:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-none text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-white text-black border border-gray-300 rounded-none text-sm sm:text-base hover:bg-gray-100 transition-colors"
          >
            SUBSCRIBE
          </button>
        </form>
      </Container>
    </div>
  );
};

export default Subscribe;