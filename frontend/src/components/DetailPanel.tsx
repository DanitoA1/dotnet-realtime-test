import React from "react";

interface DetailPanelProps {
  selectedNode: any;
  selectedType: string;
}

const DetailPanel: React.FC<DetailPanelProps> = ({
  selectedNode,
  selectedType,
}) => {
  if (!selectedNode) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-center">
          Select an item from the tree to view details
        </p>
      </div>
    );
  }

  const renderValue = (value: any): string => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  };

  const renderObject = (obj: any) => {
    const entries = Object.entries(obj).filter(([_, value]) => {
      // Filter out empty arrays and null values
      if (Array.isArray(value) && value.length === 0) return false;
      if (value === null || value === undefined) return false;
      return true;
    });

    if (entries.length === 0) return null;

    return (
      <div className="space-y-2">
        {entries.map(([key, value]) => (
          <div key={key} className="border-b border-gray-200 pb-2">
            <p className="text-sm font-medium text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </p>
            {Array.isArray(value) ? (
              <div className="mt-1 space-y-1">
                {value.length > 0 ? (
                  value.map((item, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-900 bg-gray-50 p-2 rounded"
                    >
                      {typeof item === "object" ? (
                        <pre className="text-xs overflow-x-auto">
                          {JSON.stringify(item, null, 2)}
                        </pre>
                      ) : (
                        renderValue(item)
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">Empty array</p>
                )}
              </div>
            ) : typeof value === "object" && value !== null ? (
              <pre className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded overflow-x-auto">
                {JSON.stringify(value, null, 2)}
              </pre>
            ) : (
              <p className="text-sm text-gray-900 mt-1">{renderValue(value)}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const getTitle = () => {
    switch (selectedType) {
      case "document":
        return "SCL Document";
      case "ied":
        return `IED: ${selectedNode.name}`;
      case "accesspoint":
        return `Access Point: ${selectedNode.name}`;
      case "ldevice":
        return `Logical Device: ${selectedNode.instance}`;
      case "ln0":
        return `LN0: ${selectedNode.lnClass}`;
      case "ln":
        return `Logical Node: ${selectedNode.prefix}${selectedNode.lnClass}${selectedNode.instance}`;
      case "dataset":
        return `DataSet: ${selectedNode.name}`;
      default:
        return "Details";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">{getTitle()}</h3>
        <p className="text-sm text-gray-500 mt-1">Type: {selectedType}</p>
      </div>
      <div className="p-6 overflow-auto max-h-[calc(100vh-300px)]">
        {renderObject(selectedNode)}
      </div>
    </div>
  );
};

export default DetailPanel;
