import { useState } from "react";
import FileUploader from "./components/FileUploader";
import SclViewer from "./components/SclViewer";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

function App() {
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileUploaded = () => {
    setIsFileUploaded(true);
  };

  const handleReset = () => {
    setIsFileUploaded(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DocumentTextIcon className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  IEC 61850 SCL Viewer
                </h1>
                <p className="text-sm text-gray-500">
                  Parse and visualize Substation Configuration Language files
                </p>
              </div>
            </div>
            {isFileUploaded && (
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Upload New File
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFileUploaded ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to SCL Viewer
              </h2>
              <p className="text-gray-600">
                Upload your IEC 61850 configuration file to get started
              </p>
            </div>
            <FileUploader onFileUploaded={handleFileUploaded} />
          </div>
        ) : (
          <SclViewer />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            IEC 61850 SCL/CID File Parser & Viewer - Built with .NET Core &
            React
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
