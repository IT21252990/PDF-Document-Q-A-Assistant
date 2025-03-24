import { useState } from "react";
import { uploadFile } from "../services/fileService";

export const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

  const handleFileSelection = (selectedFile) => {
    if (!selectedFile) {
      setFile(null);
      setFileName("");
      setError(""); // Clear any errors when resetting
      return;
    }
    
    if (selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError(""); // Clear any previous errors
    } else {
      setError("Please select a valid PDF file.");
      setFile(null);
      setFileName("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected.");
      return;
    }
  
    setIsUploading(true);
    setError("");
    setUploadProgress(10); // Start with some progress
  
    try {
      const response = await uploadFile(file, (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(Math.min(percentCompleted, 90));
      });
  
      // Complete the progress bar
      setUploadProgress(100);
  
      // Return the response containing sessionId
      return response;
    } catch (err) {
      setError(err.response?.data?.detail || "Error uploading file. Please try again.");
      console.error("Upload Error:", err);
      setIsUploading(false);
      setUploadProgress(0); // Reset progress on error
      return null; // Return null in case of error
    } finally {
      setIsUploading(false);
    }
  };

  return {
    file,
    fileName,
    isUploading,
    uploadProgress,
    error,
    handleFileSelection,
    handleUpload
  };
};