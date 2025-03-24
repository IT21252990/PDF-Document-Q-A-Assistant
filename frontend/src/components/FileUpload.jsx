import { FiUpload, FiFile } from "react-icons/fi";
import { ErrorDisplay } from "../components/ErrorDisplay";

export const FileUpload = ({
  handleFileChange,
  handleDrag,
  handleDrop,
  dragActive,
  fileName,
  file,
  error,
  isUploading,
  uploadProgress,
  handleUpload,
}) => {
  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed ${
        dragActive
          ? "border-indigo-400 bg-indigo-100/80 dark:border-indigo-400 dark:bg-indigo-800/40"
          : "border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/30"
      } rounded-xl p-5 w-full text-center transition-all duration-300 hover:bg-indigo-100 hover:border-indigo-300 dark:hover:bg-indigo-800/40 dark:hover:border-indigo-500 shadow-md transform hover:scale-[1.02]`}
    >
      <div className="flex flex-col items-center">
        <div
          className={`${
            dragActive ? "bg-indigo-200 dark:bg-indigo-600" : "bg-indigo-100 dark:bg-indigo-800"
          } p-4 rounded-full mb-2 transition-colors duration-300 transform hover:rotate-12`}
        >
          <FiUpload
            className={`h-8 w-8 ${
              dragActive ? "text-indigo-700 dark:text-indigo-300" : "text-indigo-600 dark:text-indigo-400"
            }`}
          />
        </div>
        <p className="text-lg text-indigo-700 dark:text-indigo-300 font-medium">
          {dragActive ? "Drop your PDF here" : "Upload a PDF to get started"}
        </p>
        <p className="text-indigo-500 dark:text-indigo-400 mb-3 max-w-md text-sm">
          {dragActive ? "Release to upload your file" : "Drag & drop your file here or click to browse"}
        </p>

        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />

        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-5 py-2 border border-transparent text-md font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-700 dark:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer transition-all duration-300 group hover:shadow-xl"
        >
          <FiFile className="mr-3 text-xl group-hover:animate-pulse" />
          Select PDF File
        </label>

        {fileName && (
          <div className="mt-4 flex items-center gap-3 justify-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-md animate-fade-in border border-indigo-100 dark:border-indigo-800">
            <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-full">
              <FiFile className="text-indigo-600 dark:text-indigo-400 h-6 w-6" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-gray-800 dark:text-gray-200 font-small truncate">{fileName}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm truncate">
                {file && file.size ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : ""}
              </p>
            </div>
          </div>
        )}

        {/* Display errors */}
        {error && <ErrorDisplay error={error} />}

        {isUploading && (
          <div className="w-full max-w-md mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                {uploadProgress < 100 ? "Uploading PDF..." : "Processing complete!"}
              </span>
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                {uploadProgress.toFixed(0)}%
              </span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {fileName && !isUploading && (
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="mt-3 inline-flex items-center px-5 py-3 border border-transparent text-lg font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 dark:from-emerald-600 dark:to-teal-700 dark:hover:from-emerald-500 dark:hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FiUpload className="mr-3 text-xl" /> Upload & Process
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};