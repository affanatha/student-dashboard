export interface Student {
  id: number;
  nis: string;
  nama: string;
  kelas: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  status: 'Aktif' | 'Non-Aktif';
}

export const studentsData: Student[] = [
  { id: 1, nis: '2026001', nama: 'Andi Pratama', kelas: 'XII-A', jenisKelamin: 'Laki-laki', status: 'Aktif' },
  { id: 2, nis: '2026002', nama: 'Siti Aminah', kelas: 'XII-B', jenisKelamin: 'Perempuan', status: 'Aktif' },
  { id: 3, nis: '2026003', nama: 'Budi Santoso', kelas: 'XI-A', jenisKelamin: 'Laki-laki', status: 'Aktif' },
  { id: 4, nis: '2026004', nama: 'Dewi Lestari', kelas: 'XI-B', jenisKelamin: 'Perempuan', status: 'Non-Aktif' },
  { id: 5, nis: '2026005', nama: 'Rizky Ramadhan', kelas: 'X-A', jenisKelamin: 'Laki-laki', status: 'Aktif' },
  { id: 6, nis: '2026006', nama: 'Nadia Putri', kelas: 'X-B', jenisKelamin: 'Perempuan', status: 'Aktif' },
  { id: 7, nis: '2026007', nama: 'Fajar Nugraha', kelas: 'XII-A', jenisKelamin: 'Laki-laki', status: 'Aktif' },
  { id: 8, nis: '2026008', nama: 'Gita Permata', kelas: 'XII-B', jenisKelamin: 'Perempuan', status: 'Aktif' },
  { id: 9, nis: '2026009', nama: 'Hendra Setiawan', kelas: 'XI-A', jenisKelamin: 'Laki-laki', status: 'Aktif' },
  { id: 10, nis: '2026010', nama: 'Indah Kusuma', kelas: 'XI-B', jenisKelamin: 'Perempuan', status: 'Non-Aktif' },
  { id: 11, nis: '2026011', nama: 'Joko Widodo', kelas: 'X-A', jenisKelamin: 'Laki-laki', status: 'Aktif' },
  { id: 12, nis: '2026012', nama: 'Kartika Sari', kelas: 'X-B', jenisKelamin: 'Perempuan', status: 'Aktif' },
];