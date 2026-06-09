import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Lead } from "./leadTypes";
import * as leadAPI from "./leadAPI";

export const fetchAllLead = createAsyncThunk<Lead[], void, { rejectValue: string }>(
  "lead/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await leadAPI.fetchAllLead();
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch leads"
      );
    }
  }
);

export const createLead = createAsyncThunk<Lead, Lead, { rejectValue: string }>(
  "lead/create",
  async (leadData, thunkAPI) => {
    try {
      return await leadAPI.createLead(leadData);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to create lead"
      );
    }
  }
);

export const fetchLeadById = createAsyncThunk<Lead, number, { rejectValue: string }>(
  "lead/fetchById",
  async (id, thunkAPI) => {
    try {
      return await leadAPI.fetchLeadById(id);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch lead"
      );
    }
  }
);

export const updateLead = createAsyncThunk<
  Lead,
  { id: number; leadData: Lead },
  { rejectValue: string }
>(
  "lead/update",
  async ({ id, leadData }, thunkAPI) => {
    try {
      return await leadAPI.updateLead(id, leadData);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to update lead"
      );
    }
  }
);

export const deleteLead = createAsyncThunk<number, number, { rejectValue: string }>(
  "lead/delete",
  async (id, thunkAPI) => {
    try {
      await leadAPI.deleteLead(id);
      return id;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete lead"
      );
    }
  }
);
