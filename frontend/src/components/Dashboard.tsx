import { useEffect, useState } from "react";
import { sclApi } from "../services/api";
import type {
  SclSummary,
  IedInfo,
  CommunicationInfo,
} from "../types/scl.types";
import {
  ServerIcon,
  CpuChipIcon,
  CircleStackIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<SclSummary | null>(null);
  const [devices, setDevices] = useState<IedInfo[]>([]);
  const [communication, setCommunication] = useState<CommunicationInfo | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [summaryData, devicesData, commData] = await Promise.all([
        sclApi.getSummary(),
        sclApi.getDevices(),
        sclApi.getCommunication(),
      ]);

      setSummary(summaryData);
      setDevices(devicesData);
      setCommunication(commData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ServerIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total IEDs</p>
              <p className="text-2xl font-bold text-gray-900">
                {summary?.totalIEDs || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CpuChipIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Logical Devices
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {summary?.totalLogicalDevices || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CircleStackIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Data Sets</p>
              <p className="text-2xl font-bold text-gray-900">
                {summary?.totalDataSets || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <SignalIcon className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Logical Nodes</p>
              <p className="text-2xl font-bold text-gray-900">
                {summary?.totalLogicalNodes || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Device Information */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Devices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manufacturer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Config Version
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Logical Devices
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {devices.map((device, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {device.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.manufacturer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.configVersion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.ipAddress || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.logicalDeviceCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Communication Information */}
      {communication && communication.subNetworks.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Communication Settings
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {communication.subNetworks.map((subnet, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h4 className="font-semibold text-gray-900 mb-3">
                  SubNetwork: {subnet.name}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subnet.connectedDevices.map((device, deviceIndex) => (
                    <div key={deviceIndex} className="bg-gray-50 rounded p-3">
                      <p className="font-medium text-sm text-gray-900">
                        {device.iedName}
                      </p>
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">IP:</span>{" "}
                          {device.ipAddress}
                        </p>
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Subnet:</span>{" "}
                          {device.subnetMask}
                        </p>
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Gateway:</span>{" "}
                          {device.gateway}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header Information */}
      {summary && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Document Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Tool ID</p>
              <p className="text-sm text-gray-900">{summary.toolID}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Version</p>
              <p className="text-sm text-gray-900">{summary.version}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
