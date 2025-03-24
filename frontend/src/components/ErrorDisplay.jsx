export const ErrorDisplay = ({ error }) => {
    return (
      <div className="mt-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 p-4 rounded-lg w-full max-w-md border-l-4 border-red-500 dark:border-red-600 shadow-sm">
        <div className="flex items-start">
          <svg className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  };