import { useState, useRef } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

interface FileUploaderProps {
  onFileUploaded: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await uploadFile(files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await uploadFile(files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    setError(null);
    setSuccess(null);

    // Validate file extension
    if (
      !file.name.endsWith(".cid") &&
      !file.name.endsWith(".icd") &&
      !file.name.endsWith(".scd")
    ) {
      setError("Invalid file type. Please upload a .cid, .icd, or .scd file.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5021/api/scl/parse", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload file");
      }

      await response.json();

      setSuccess(`File "${file.name}" uploaded successfully!`);
      onFileUploaded();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while uploading the file"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".cid,.icd,.scd"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center">
          <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mb-4" />

          {isUploading ? (
            <div className="text-gray-600">
              <p className="text-lg font-medium">Uploading...</p>
              <div className="mt-2 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-pulse"></div>
              </div>
            </div>
          ) : (
            <>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drop your SCL file here, or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports .cid, .icd, and .scd files
              </p>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm">{success}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
