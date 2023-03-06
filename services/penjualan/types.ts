import { Data } from "services/types"

export interface Penjualan {
  id: string
  tanggal: string
  barang: string
  jumlah_barang: number
  total_harga: number
}

export type AddPenjualan = Omit<Penjualan, "id">;

export type PenjualanData = Data<Penjualan>

export type PenjualanMessage = {
  message: string,
}