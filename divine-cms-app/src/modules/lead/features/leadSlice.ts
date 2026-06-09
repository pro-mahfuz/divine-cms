import { createSlice } from "@reduxjs/toolkit";
import { LeadState } from "./leadTypes";
import { createLead, deleteLead, fetchAllLead, fetchLeadById, updateLead } from "./leadThunks";

const initialState: LeadState = {
  data: [],
  status: "idle",
  error: null,
};

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLead.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllLead.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAllLead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message || "Failed to fetch leads";
      })
      .addCase(createLead.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.unshift(action.payload);
      })
      .addCase(createLead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message || "Failed to create lead";
      })
      .addCase(fetchLeadById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLeadById.fulfilled, (state, action) => {
        state.status = "succeeded";
        const existingIndex = state.data.findIndex((lead) => lead.id === action.payload.id);

        if (existingIndex >= 0) {
          state.data[existingIndex] = action.payload;
        } else {
          state.data.push(action.payload);
        }
      })
      .addCase(fetchLeadById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message || "Failed to fetch lead";
      })
      .addCase(updateLead.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.status = "succeeded";
        const existingIndex = state.data.findIndex((lead) => lead.id === action.payload.id);

        if (existingIndex >= 0) {
          state.data[existingIndex] = action.payload;
        } else {
          state.data.unshift(action.payload);
        }
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message || "Failed to update lead";
      })
      .addCase(deleteLead.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter((lead) => lead.id !== action.payload);
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message || "Failed to delete lead";
      });
  },
});

export default leadSlice.reducer;
