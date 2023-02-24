import { Data } from "services/types"

export interface Supplier {
  id: string
  nama: string
  alamat: string
  nomor_telepon: string
}

export type AddSupplier = Omit<Supplier, "id">;

export type SupplierData = Data<Supplier>

export type SupplierMessage = {
  message: string,
}