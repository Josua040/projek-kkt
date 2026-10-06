import type { Metadata } from 'next';
import { site } from '@/data/site';
import PotensiContent from '@/components/PotensiContent';

export const metadata: Metadata = {
  title: `Potensi Wisata — ${site.nama}`,
  description: `Jelajahi potensi wisata di ${site.nama}, ${site.kecamatan}, ${site.kota}.`,
};

export default function PotensiPage() {
  return <PotensiContent />;
}
