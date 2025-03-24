import { FiFile } from "react-icons/fi";

export const FileInfo = ({ fileName, fileSize }) => {
  return (
    <div className="mt-4 flex items-center gap-3 justify-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-md animate-fade-in border border-indigo-100 dark:border-indigo-800">
      <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-full">
        <FiFile className="text-indigo-600 dark:text-indigo-400 h-6 w-6" />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-gray-800 dark:text-gray-200 font-small truncate">{fileName}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm truncate">{fileSize}</p>
      </div>
    </div>
  );
};