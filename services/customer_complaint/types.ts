import { Data } from "services/types"

export interface Customer_Complaint {
  id: string;
  name: string;
  address: string;
  city: string;
  description: string;
}

export type AddCustomerComplaint = Omit<Customer_Complaint, "id">;

export type CustomerComplaintData = Data<Customer_Complaint>

export type CustomerComplaintMessage = {
  message: string,
}