import { FiMessageCircle, FiInfo, FiFileText, FiDatabase } from "react-icons/fi";

import { FileUpload } from "../components/FileUpload";
import { ErrorDisplay } from "../components/ErrorDisplay";

export const HomePage = ({
  handleFileChange,
  handleDrag,
  handleDrop,
  dragActive,
  fileName,
  file,
  error,
  isUploading,
  uploadProgress,
  handleUpload
}) => {
  return (
    <div className="flex flex-col items-center mx-auto p-10 justify-center w-full max-w-3xl">
      <FileUpload
        handleFileChange={handleFileChange}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
        dragActive={dragActive}
        fileName={fileName}
        file={file}
        error={error}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        handleUpload={handleUpload}
      />
      {error && <ErrorDisplay error={error} />}
      {!fileName && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 w-full">
          <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-100 dark:border-purple-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]">
            <div className="bg-purple-100 dark:bg-purple-800/50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
              <FiMessageCircle className="text-purple-600 dark:text-purple-300" />
            </div>
            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Ask questions</p>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Get answers based on the document content</p>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]">
            <div className="bg-indigo-100 dark:bg-indigo-800/50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
              <FiInfo className="text-indigo-600 dark:text-indigo-300" />
            </div>
            <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Find information</p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">Locate specific details in your PDF</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]">
            <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
              <FiFileText className="text-blue-600 dark:text-blue-300" />
            </div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Get summaries</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Condense long documents into key points</p>
          </div>
          <div className="bg-teal-50 dark:bg-teal-900/30 p-4 rounded-lg border border-teal-100 dark:border-teal-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]">
            <div className="bg-teal-100 dark:bg-teal-800/50 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
              <FiDatabase className="text-teal-600 dark:text-teal-300" />
            </div>
            <p className="text-sm font-medium text-teal-700 dark:text-teal-300">Extract data</p>
            <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">Pull specific data from your document</p>
          </div>
        </div>
      )}
    </div>
  );
};