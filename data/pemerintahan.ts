export type Perangkat = {
  nama: string;
  jabatan: string;
  foto?: string; // path di /public/images/pemerintahan/
};

// TODO: data dari kantor kelurahan (nama, jabatan, dan foto seluruh perangkat)
export const perangkat: Perangkat[] = [];
