import { RootState } from "../../../store/store";
import { Lead } from "./leadTypes";

export const selectLeadStatus = (state: RootState) => state.lead.status;
export const selectLeadError = (state: RootState) => state.lead.error;
export const selectAllLead = (state: RootState): Lead[] => state.lead.data || [];
export const selectLeadById = (id: number) => (state: RootState) =>
  state.lead.data.find((lead) => lead.id === id);
