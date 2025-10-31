import axios from "axios";
import type {
  SclDocument,
  SclSummary,
  IedInfo,
  CommunicationInfo,
  IED,
} from "../types/scl.types";

const API_BASE_URL = "http://localhost:5021/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sclApi = {
  // Parse a CID file
  parseFile: async (
    file: File
  ): Promise<{ success: boolean; message: string; data: SclDocument }> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/scl/parse", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Get summary statistics
  getSummary: async (): Promise<SclSummary> => {
    const response = await api.get("/scl/summary");
    return response.data;
  },

  // Get list of all devices
  getDevices: async (): Promise<IedInfo[]> => {
    const response = await api.get("/scl/devices");
    return response.data;
  },

  // Get specific device by name
  getDeviceByName: async (name: string): Promise<IED> => {
    const response = await api.get(`/scl/devices/${name}`);
    return response.data;
  },

  // Get communication information
  getCommunication: async (): Promise<CommunicationInfo> => {
    const response = await api.get("/scl/communication");
    return response.data;
  },

  // Get full document
  getFullDocument: async (): Promise<SclDocument> => {
    const response = await api.get("/scl/document");
    return response.data;
  },

  // Clear cache
  clearCache: async (): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete("/scl/clear");
    return response.data;
  },
};

export default api;
