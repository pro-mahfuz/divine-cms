export interface Lead {
  id?: number;
  businessId?: number;
  date: string;
  websiteName: string;
  clientName: string;
  phoneNumber: string;
  serviceNeeded: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeadState {
  data: Lead[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
