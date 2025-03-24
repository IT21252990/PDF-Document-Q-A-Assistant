import { FiTrash2 } from "react-icons/fi";

export const EndSessionButton = ({ handleEndSession }) => {
  return (
    <button
      onClick={handleEndSession}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 dark:from-red-600 dark:to-pink-700 dark:hover:from-red-500 dark:hover:to-pink-600 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
    >
      <FiTrash2 className="mr-2" /> End Session
    </button>
  );
};