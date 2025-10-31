import { useState, useEffect } from "react";
import { sclApi } from "../services/api";
import type { SclDocument, FCDA } from "../types/scl.types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const DataTable: React.FC = () => {
  const [dataSets, setDataSets] = useState<
    Array<{ name: string; ldInst: string; fcdas: FCDA[] }>
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await sclApi.getFullDocument();
      console.log("API Response:", data);
      console.log("IEDs property:", data.ieds);
      console.log("Keys:", Object.keys(data));
      extractDataSets(data);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const extractDataSets = (doc: SclDocument) => {
    const allDataSets: Array<{ name: string; ldInst: string; fcdas: FCDA[] }> =
      [];

    if (!doc || !doc.ieds) {
      console.error("Document or ieds is undefined:", doc);
      setDataSets(allDataSets);
      return;
    }

    doc.ieds.forEach((ied) => {
      if (!ied.accessPoints) return;
      
      ied.accessPoints.forEach((ap) => {
        if (!ap.server?.lDevices) return;
        
        ap.server.lDevices.forEach((lDevice) => {
          if (!lDevice.ln0?.dataSets) return;
          
          lDevice.ln0.dataSets.forEach((dataSet) => {
            allDataSets.push({
              name: dataSet.name,
              ldInst: lDevice.instance,
              fcdas: dataSet.fcdas || [],
            });
          });
        });
      });
    });

    setDataSets(allDataSets);
  };

  const filteredFCDAs = dataSets.flatMap((ds) =>
    ds.fcdas
      .filter((fcda) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          ds.name.toLowerCase().includes(searchLower) ||
          fcda.ldInst.toLowerCase().includes(searchLower) ||
          fcda.lnClass.toLowerCase().includes(searchLower) ||
          fcda.doName.toLowerCase().includes(searchLower) ||
          fcda.fc.toLowerCase().includes(searchLower)
        );
      })
      .map((fcda) => ({
        ...fcda,
        dataSetName: ds.name,
        dataSetLdInst: ds.ldInst,
      }))
  );

  const exportToCSV = () => {
    const headers = [
      "DataSet",
      "LD Instance",
      "LN Class",
      "LN Instance",
      "DO Name",
      "DA Name",
      "FC",
      "Prefix",
    ];
    const rows = filteredFCDAs.map((fcda) => [
      (fcda as any).dataSetName,
      fcda.ldInst,
      fcda.lnClass,
      fcda.lnInst,
      fcda.doName,
      fcda.daName || "",
      fcda.fc,
      fcda.prefix || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = window.document.createElement("a");
    link.href = url;
    link.download = "scl-data.csv";
    link.click();
    window.URL.revokeObjectURL(url);
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
    <div className="space-y-4">
      {/* Search and Actions */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search FCDAs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={exportToCSV}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Export to CSV
        </button>
      </div>

      {/* DataSets Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm font-medium text-gray-600">Total DataSets</p>
          <p className="text-2xl font-bold text-gray-900">{dataSets.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm font-medium text-gray-600">Total FCDAs</p>
          <p className="text-2xl font-bold text-gray-900">
            {dataSets.reduce((sum, ds) => sum + ds.fcdas.length, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm font-medium text-gray-600">Filtered Results</p>
          <p className="text-2xl font-bold text-gray-900">
            {filteredFCDAs.length}
          </p>
        </div>
      </div>

      {/* FCDA Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">FCDA Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DataSet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LD Instance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LN Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LN Instance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DO Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DA Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FC
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFCDAs.length > 0 ? (
                filteredFCDAs.map((fcda, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {(fcda as any).dataSetName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {fcda.ldInst}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {fcda.lnClass}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {fcda.lnInst}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {fcda.doName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {fcda.daName || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {fcda.fc}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-sm text-gray-500"
                  >
                    No FCDAs found matching your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
