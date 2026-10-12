import type { Metadata } from 'next';
import { site } from '@/data/site';
import ProfilContent from '@/components/ProfilContent';

export const metadata: Metadata = {
  title: `Profil Kelurahan — ${site.nama}`,
  description: `Sejarah, visi misi, dan struktur pemerintahan ${site.nama}, ${site.kecamatan}, ${site.kota}.`,
};

export default function ProfilPage() {
  return <ProfilContent />;
}
