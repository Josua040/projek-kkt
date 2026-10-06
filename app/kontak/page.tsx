import type { Metadata } from 'next';
import { site } from '@/data/site';
import KontakContent from '@/components/KontakContent';

export const metadata: Metadata = {
  title: `Kontak — ${site.nama}`,
  description: `Informasi kontak dan lokasi peta ${site.nama}, ${site.kecamatan}, ${site.kota}.`,
};

export default function KontakPage() {
  return <KontakContent />;
}
