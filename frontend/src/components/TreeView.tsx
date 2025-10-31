import { useState, useEffect } from "react";
import { sclApi } from "../services/api";
import type { SclDocument } from "../types/scl.types";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  DocumentIcon,
  ServerIcon,
  CpuChipIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";

interface TreeViewProps {
  onNodeSelect: (node: any, type: string) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ onNodeSelect }) => {
  const [document, setDocument] = useState<SclDocument | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDocument();
  }, []);

  const loadDocument = async () => {
    try {
      setLoading(true);
      const data = await sclApi.getFullDocument();
      setDocument(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load document");
    } finally {
      setLoading(false);
    }
  };

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const isExpanded = (nodeId: string) => expandedNodes.has(nodeId);

  const handleNodeClick = (node: any, type: string, nodeId: string) => {
    toggleNode(nodeId);
    onNodeSelect(node, type);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-700">No document loaded</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">SCL Structure</h3>
      </div>
      <div className="p-4 overflow-auto max-h-[calc(100vh-300px)]">
        {/* Root Node */}
        <div className="space-y-1">
          <div
            className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded cursor-pointer"
            onClick={() => handleNodeClick(document, "document", "root")}
          >
            {isExpanded("root") ? (
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            )}
            <DocumentIcon className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">
              SCL Document
            </span>
          </div>

          {isExpanded("root") && (
            <div className="ml-6 space-y-1">
              {/* IEDs */}
              {document.ieds &&
                document.ieds.map((ied, iedIndex) => (
                  <div key={`ied-${iedIndex}`}>
                    <div
                      className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded cursor-pointer"
                      onClick={() =>
                        handleNodeClick(ied, "ied", `ied-${iedIndex}`)
                      }
                    >
                      {isExpanded(`ied-${iedIndex}`) ? (
                        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                      )}
                      <ServerIcon className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">
                        {ied.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({ied.manufacturer})
                      </span>
                    </div>

                    {isExpanded(`ied-${iedIndex}`) && ied.accessPoints && (
                      <div className="ml-6 space-y-1">
                        {ied.accessPoints.map((ap, apIndex) => (
                          <div key={`ap-${iedIndex}-${apIndex}`}>
                            <div
                              className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded cursor-pointer"
                              onClick={() =>
                                handleNodeClick(
                                  ap,
                                  "accesspoint",
                                  `ap-${iedIndex}-${apIndex}`
                                )
                              }
                            >
                              {isExpanded(`ap-${iedIndex}-${apIndex}`) ? (
                                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                              ) : (
                                <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                              )}
                              <CpuChipIcon className="w-5 h-5 text-purple-600" />
                              <span className="text-sm text-gray-900">
                                Access Point: {ap.name}
                              </span>
                            </div>

                            {isExpanded(`ap-${iedIndex}-${apIndex}`) &&
                              ap.server?.lDevices && (
                                <div className="ml-6 space-y-1">
                                  {ap.server.lDevices.map(
                                    (lDevice, ldIndex) => (
                                      <div
                                        key={`ld-${iedIndex}-${apIndex}-${ldIndex}`}
                                      >
                                        <div
                                          className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded cursor-pointer"
                                          onClick={() =>
                                            handleNodeClick(
                                              lDevice,
                                              "ldevice",
                                              `ld-${iedIndex}-${apIndex}-${ldIndex}`
                                            )
                                          }
                                        >
                                          {isExpanded(
                                            `ld-${iedIndex}-${apIndex}-${ldIndex}`
                                          ) ? (
                                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                                          ) : (
                                            <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                                          )}
                                          <CpuChipIcon className="w-5 h-5 text-orange-600" />
                                          <span className="text-sm text-gray-900">
                                            {lDevice.instance}
                                          </span>
                                          {lDevice.description && (
                                            <span className="text-xs text-gray-500">
                                              ({lDevice.description})
                                            </span>
                                          )}
                                        </div>

                                        {isExpanded(
                                          `ld-${iedIndex}-${apIndex}-${ldIndex}`
                                        ) && (
                                          <div className="ml-6 space-y-1">
                                            {/* LN0 */}
                                            {lDevice.ln0 && (
                                              <div>
                                                <div
                                                  className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded cursor-pointer"
                                                  onClick={() =>
                                                    handleNodeClick(
                                                      lDevice.ln0,
                                                      "ln0",
                                                      `ln0-${iedIndex}-${apIndex}-${ldIndex}`
                                                    )
                                                  }
                                                >
                                                  {isExpanded(
                                                    `ln0-${iedIndex}-${apIndex}-${ldIndex}`
                                                  ) ? (
                                                    <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                                                  ) : (
                                                    <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                                                  )}
                                                  <CircleStackIcon className="w-5 h-5 text-blue-500" />
                                                  <span className="text-sm text-gray-900">
                                                    LN0 ({lDevice.ln0.lnClass})
                                                  </span>
                                                </div>

                                                {isExpanded(
                                                  `ln0-${iedIndex}-${apIndex}-${ldIndex}`
                                                ) &&
                                                  lDevice.ln0.dataSets && (
                                                    <div className="ml-6 space-y-1">
                                                      {lDevice.ln0.dataSets.map(
                                                        (dataSet, dsIndex) => (
                                                          <div
                                                            key={`ds-${iedIndex}-${apIndex}-${ldIndex}-${dsIndex}`}
                                                            className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded cursor-pointer"
                                                            onClick={() =>
                                                              handleNodeClick(
                                                                dataSet,
                                                                "dataset",
                                                                `ds-${iedIndex}-${apIndex}-${ldIndex}-${dsIndex}`
                                                              )
                                                            }
                                                          >
                                                            <CircleStackIcon className="w-4 h-4 text-indigo-500" />
                                                            <span className="text-sm text-gray-900">
                                                              DataSet:{" "}
                                                              {dataSet.name}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                              (
                                                              {dataSet.fcdas
                                                                ?.length ||
                                                                0}{" "}
                                                              FCDAs)
                                                            </span>
                                                          </div>
                                                        )
                                                      )}
                                                    </div>
                                                  )}
                                              </div>
                                            )}

                                            {/* Logical Nodes */}
                                            {lDevice.logicalNodes &&
                                              lDevice.logicalNodes.map(
                                                (ln, lnIndex) => (
                                                  <div
                                                    key={`ln-${iedIndex}-${apIndex}-${ldIndex}-${lnIndex}`}
                                                    className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded cursor-pointer"
                                                    onClick={() =>
                                                      handleNodeClick(
                                                        ln,
                                                        "ln",
                                                        `ln-${iedIndex}-${apIndex}-${ldIndex}-${lnIndex}`
                                                      )
                                                    }
                                                  >
                                                    <CircleStackIcon className="w-5 h-5 text-teal-600" />
                                                    <span className="text-sm text-gray-900">
                                                      {ln.prefix}
                                                      {ln.lnClass}
                                                      {ln.instance}
                                                    </span>
                                                    {ln.description && (
                                                      <span className="text-xs text-gray-500">
                                                        ({ln.description})
                                                      </span>
                                                    )}
                                                  </div>
                                                )
                                              )}
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreeView;
