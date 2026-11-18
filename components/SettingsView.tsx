'use client';

import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  Chip,
  Badge,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import TuneIcon from '@mui/icons-material/Tune';

export default function SettingsView() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          Pengaturan & Profil Pengguna
        </Typography>
        <Typography color="text.secondary">
          Kelola informasi akun pengguna, data identitas sekolah, dan preferensi aplikasi.
        </Typography>
      </Box>

      {/* 1. KARTU INFORMASI PENGGUNA (PROFIL ADMIN) */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3,
          border: '1px solid #e2e8f0',
          bgcolor: '#ffffff',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
          <PersonIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Informasi Profil Pengguna
          </Typography>
        </Box>

        {/* Ringkasan Profil Pengguna (Flexbox horizontal) */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2.5,
            p: 2,
            borderRadius: 2.5,
            bgcolor: '#f8fafc',
            border: '1px solid #e2e8f0',
            mb: 3,
            flexWrap: 'wrap',
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            sx={{
              '& .MuiBadge-badge': {
                bgcolor: '#10b981',
                boxShadow: '0 0 0 2px #fff',
                width: 12,
                height: 12,
                borderRadius: '50%',
              },
            }}
          >
            <Avatar
              sx={{
                width: 60,
                height: 60,
                bgcolor: '#2563eb',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              AA
            </Avatar>
          </Badge>

          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 0.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Affan Athaillah
              </Typography>
              <Chip
                label="Super Administrator"
                size="small"
                color="primary"
                sx={{ fontWeight: 700, height: 24 }}
              />
              <Chip
                label="Online"
                size="small"
                sx={{
                  bgcolor: '#dcfce7',
                  color: '#15803d',
                  fontWeight: 700,
                  height: 24,
                  border: '1px solid #bbf7d0',
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              NIP: 19980512 202401 1 001 &bull; affan@sekolah.sch.id
            </Typography>
          </Box>
        </Box>

        {/* Form Detail Pengguna (CSS Grid) */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2.5,
          }}
        >
          <TextField
            label="Nama Lengkap"
            defaultValue="Affan Athaillah"
            fullWidth
            size="small"
          />
          <TextField
            label="NIP / ID Pengguna"
            defaultValue="19980512 202401 1 001"
            fullWidth
            size="small"
          />
          <TextField
            label="Email Pengguna"
            defaultValue="affan@sekolah.sch.id"
            fullWidth
            size="small"
          />
          <TextField
            label="Nomor Telepon"
            defaultValue="+62 812-3456-7890"
            fullWidth
            size="small"
          />
          <TextField
            label="Peran / Hak Akses"
            defaultValue="Administrator Utama"
            disabled
            fullWidth
            size="small"
          />
          <TextField
            label="Divisi / Unit Kerja"
            defaultValue="Tata Usaha & IT Akademik"
            fullWidth
            size="small"
          />
        </Box>
      </Paper>

      {/* 2. KARTU INFORMASI SEKOLAH */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3,
          border: '1px solid #e2e8f0',
          bgcolor: '#ffffff',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
          <SchoolIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Informasi Sekolah
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2.5,
          }}
        >
          <TextField
            label="Nama Sekolah"
            defaultValue="SMA Negeri 1 Teladan"
            fullWidth
            size="small"
          />
          <TextField
            label="NPSN"
            defaultValue="20108842"
            fullWidth
            size="small"
          />
          <TextField
            label="Tahun Ajaran"
            defaultValue="2026/2027"
            fullWidth
            size="small"
          />
          <TextField
            label="Semester"
            defaultValue="Ganjil"
            fullWidth
            size="small"
          />
          <TextField
            label="Email Sekolah"
            defaultValue="info@sekolah.sch.id"
            fullWidth
            size="small"
          />
          <TextField
            label="Nomor Telepon Sekolah"
            defaultValue="+62 21 555-0123"
            fullWidth
            size="small"
          />
        </Box>
      </Paper>

      {/* 3. KARTU PREFERENSI & NOTIFIKASI */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3,
          border: '1px solid #e2e8f0',
          bgcolor: '#ffffff',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
          <TuneIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Preferensi & Notifikasi Sistem
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
          <FormControlLabel
            control={<Switch defaultChecked color="primary" />}
            label="Kirim email pemberitahuan saat ada data siswa baru terdaftar"
          />
          <FormControlLabel
            control={<Switch defaultChecked color="primary" />}
            label="Aktifkan pencatatan log riwayat aktivitas admin"
          />
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Mode pemeliharaan sistem (Maintenance Mode)"
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            sx={{ px: 3, py: 1, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Simpan Seluruh Pengaturan
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
