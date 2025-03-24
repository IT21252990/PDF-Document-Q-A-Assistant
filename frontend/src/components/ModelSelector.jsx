import { FiSettings } from "react-icons/fi";

export const ModelSelector = ({ modelType, handleModelChange }) => {
  return (
    <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg ">
      <div className="flex items-center bg-indigo-50 dark:bg-indigo-900/40 rounded-lg">
        <FiSettings className="text-indigo-500 dark:text-indigo-400 h-4 w-4 ml-2 animate-pulse" />
        <select
          className="text-sm bg-transparent border-none focus:ring-0 text-gray-700 dark:text-gray-300 pr-6 dark:bg-indigo-900/40 font-medium"
          value={modelType}
          onChange={handleModelChange}
        >
          <option value="langgraph">LangGraph Workflow</option>
          <option value="standard">Standard Chain</option>
        </select>
      </div>
    </div>
  );
};