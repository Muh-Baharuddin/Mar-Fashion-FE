export interface Supplier {
  id: string
  nama: string
  alamat: string
  nomor_telepon: string
}

export interface Data {
  data: Supplier[],
  total: number;
}