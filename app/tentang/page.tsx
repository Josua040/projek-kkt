import type { Metadata } from 'next';
import { site } from '@/data/site';
import TentangContent from '@/components/TentangContent';

export const metadata: Metadata = {
  title: `Tentang Kami — ${site.nama}`,
  description: `Tentang website profil ${site.nama} yang dibuat sebagai program kerja KKT Unsrat beserta Tim KKT Unsrat.`,
};

export default function TentangPage() {
  return <TentangContent />;
}
