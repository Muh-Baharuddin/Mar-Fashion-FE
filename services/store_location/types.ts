import { Data } from "services/types"

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
}

export type AddStoreLocation = Omit<StoreLocation, "id">;

export type StoreLocationData = Data<StoreLocation>

export type StoreLocationMessage = {
  message: string,
}