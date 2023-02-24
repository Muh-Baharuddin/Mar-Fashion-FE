import { Data } from "services/types"

export interface Supplier {
  id: string
  nama: string
  alamat: string
  nomor_telepon: string
}

export type SupplierData = Data<Supplier>

export type SupplierDeleteData = {
  message: string,
}