import axiosInstance from "../../../api/axios";
import { Lead } from "./leadTypes";

export const fetchAllLead = async () => {
  try {
    const res = await axiosInstance.get("protected/lead/list");
    return res.data.data;
  } catch {
    throw new Error("No data available");
  }
};

export const createLead = async (leadData: Lead) => {
  try {
    const res = await axiosInstance.post("protected/lead/create", leadData);
    return res.data.data;
  } catch {
    throw new Error("No data available");
  }
};

export const fetchLeadById = async (id: number) => {
  try {
    const res = await axiosInstance.get(`protected/lead/${id}/view`);
    return res.data.data;
  } catch {
    throw new Error("Failed to fetch lead");
  }
};

export const updateLead = async (id: number, leadData: Lead) => {
  try {
    const res = await axiosInstance.put(`protected/lead/${id}`, leadData);
    return res.data.data;
  } catch {
    throw new Error("Failed to update lead");
  }
};

export const deleteLead = async (id: number) => {
  try {
    const res = await axiosInstance.post(`protected/lead/${id}/delete`);
    return res.data.data;
  } catch {
    throw new Error("Failed to delete lead");
  }
};
