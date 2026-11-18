'use client';

import { useState } from 'react';

import {
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material';

import GroupsIcon from '@mui/icons-material/Groups';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import StudentTable from '../components/StudentTable';
import SettingsView from '../components/SettingsView';
import { studentsData } from '../data/student';

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    {
      title: 'Total Siswa',
      value: 120,
      icon: <GroupsIcon fontSize="large" />,
      color: '#2563eb',
      background: '#eff6ff',
    },
    {
      title: 'Siswa Laki-laki',
      value: 65,
      icon: <MaleIcon fontSize="large" />,
      color: '#0891b2',
      background: '#ecfeff',
    },
    {
      title: 'Siswa Perempuan',
      value: 55,
      icon: <FemaleIcon fontSize="large" />,
      color: '#db2777',
      background: '#fdf2f8',
    },
    {
      title: 'Jumlah Kelas',
      value: 6,
      icon: <SchoolIcon fontSize="large" />,
      color: '#7c3aed',
      background: '#f5f3ff',
    },
  ];

  const getPageTitle = () => {
    switch (activeMenu) {
      case 'students':
        return 'Data Siswa';
      case 'settings':
        return 'Pengaturan';
      default:
        return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (activeMenu) {
      case 'students':
        return 'Direktori dan manajemen data siswa terdaftar';
      case 'settings':
        return 'Konfigurasi sekolah dan preferensi aplikasi';
      default:
        return 'Selamat datang di StudentApp';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Sidebar Navigasi - Flexbox Vertikal */}
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeMenu={activeMenu}
        onMenuSelect={(menu) => setActiveMenu(menu)}
      />

      {/* Main Content Menggunakan Flexbox */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          ml: { xs: 0, md: '260px' },
        }}
      >
        {/* Navbar */}
        <Navbar
          onMenuClick={() => setMobileOpen(true)}
          title={getPageTitle()}
          subtitle={getPageSubtitle()}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showSearch={activeMenu === 'students'}
          onNavigateSettings={() => setActiveMenu('settings')}
        />

        {/* Dynamic Content Berdasarkan Menu yang Dipilih */}
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {/* 1. TAMPILAN DASHBOARD: Kartu Statistik + Ringkasan */}
          {activeMenu === 'dashboard' && (
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Dashboard Overview
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Ringkasan statistik data siswa tahun ajaran ini.
              </Typography>

              {/* Statistics Grid - Penerapan CSS Grid (1 kolom mobile, 2 tablet, 4 desktop) */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    lg: 'repeat(4, 1fr)',
                  },
                  gap: 2,
                  mb: 3,
                }}
              >
                {stats.map((stat) => (
                  <StatCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                    background={stat.background}
                  />
                ))}
              </Box>

              {/* Kartu Pintasan ke Data Siswa */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, md: 3.5 },
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                  bgcolor: '#ffffff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Manajemen Data Siswa
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lihat daftar lengkap siswa, pencarian NIS, filter kelas, dan status akademik.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setActiveMenu('students')}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 2.5,
                    py: 1,
                  }}
                >
                  Buka Data Siswa
                </Button>
              </Paper>
            </Box>
          )}

          {/* 2. TAMPILAN DATA SISWA: Tabel Data Siswa Lengkap */}
          {activeMenu === 'students' && (
            <Box>
              <StudentTable
                students={studentsData}
                searchQuery={searchQuery}
              />
            </Box>
          )}

          {/* 3. TAMPILAN PENGATURAN: Form Pengaturan Sekolah & Aplikasi */}
          {activeMenu === 'settings' && <SettingsView />}
        </Box>
      </Box>
    </Box>
  );
}
