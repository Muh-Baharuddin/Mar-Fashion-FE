import * as api from "services/api";
import { QueryParamsType } from 'services/types';
import { AddCustomerComplaint, CustomerComplaintData, CustomerComplaintMessage } from "./types";

export const complaint_url = `${process.env.API_ENDPOINT}/customer-complaint`

export const getComplaints = (params: QueryParamsType) => {
  return api.stateGet<CustomerComplaintData, QueryParamsType>(complaint_url, params);
}

export const postComplaint = (data: AddCustomerComplaint) => {
  return api.post<AddCustomerComplaint>(complaint_url, data);
}

export const updateComplaint = (id: string, data: AddCustomerComplaint) => {
  return api.patch<CustomerComplaintMessage>(complaint_url + "/" + id, data);
}

export const deleteComplaint = (id: string) => {
  return api.remove<CustomerComplaintMessage>(complaint_url + "/" + id);
}
