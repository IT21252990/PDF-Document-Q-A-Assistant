export const ProgressIndicator = ({ progress, label }) => {
    return (
      <div className="w-full max-w-md">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">{label}</span>
          <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">{progress.toFixed(0)}%</span>
        </div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };