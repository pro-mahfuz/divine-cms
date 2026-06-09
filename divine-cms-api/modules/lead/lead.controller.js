import * as LeadService from "./lead.service.js";
import { success, error } from "../../utils/responseHandler.js";

export const getAllLeads = async (req, res) => {
  try {
    const data = await LeadService.getAllLeads(req);
    return success(res, data, "Leads retrieved successfully");
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

export const getLeadById = async (req, res) => {
  try {
    const data = await LeadService.getLeadById(req, Number(req.params.id));
    return success(res, data, "Lead retrieved successfully");
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

export const createLead = async (req, res) => {
  try {
    const data = await LeadService.createLead(req);
    return success(res, data, "Lead created successfully", 201);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

export const createPublicLead = async (req, res) => {
  try {
    const data = await LeadService.createPublicLead(req);
    return success(res, data, "Lead created successfully", 201);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

export const updateLead = async (req, res) => {
  try {
    const data = await LeadService.updateLead(req, Number(req.params.id));
    return success(res, data, "Lead updated successfully");
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

export const deleteLead = async (req, res) => {
  try {
    const data = await LeadService.deleteLead(req, Number(req.params.id));
    return success(res, data, "Lead deleted successfully");
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};
