'use client';

import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Chip,
    Avatar,
    TextField,
    InputAdornment,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    Alert,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Student } from '../data/student';

interface StudentTableProps {
    students: Student[];
    searchQuery?: string;
    onAddStudent?: (student: Omit<Student, 'id'>) => void;
    onEditStudent?: (student: Student) => void;
    onDeleteStudent?: (id: number) => void;
}

const defaultClasses = ['X-A', 'X-B', 'XI-A', 'XI-B', 'XII-A', 'XII-B'];

export default function StudentTable({
    students,
    searchQuery: externalSearch = '',
    onAddStudent,
    onEditStudent,
    onDeleteStudent,
}: StudentTableProps) {
    const [internalSearch, setInternalSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // State untuk Modal Form (Tambah / Edit)
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [formData, setFormData] = useState({
        nama: '',
        nis: '',
        kelas: 'XII-A',
        jenisKelamin: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
        status: 'Aktif' as 'Aktif' | 'Non-Aktif',
    });

    // State untuk Modal Konfirmasi Hapus
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);

    // State untuk Notifikasi Snackbar
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'info' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    // Filter Pencarian
    const query = (externalSearch || internalSearch).toLowerCase().trim();
    const filteredStudents = students.filter(
        (student) =>
            student.nama.toLowerCase().includes(query) ||
            student.nis.toLowerCase().includes(query) ||
            student.kelas.toLowerCase().includes(query)
    );

    // Pagination
    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const displayedStudents = filteredStudents.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // Buka Modal Tambah Siswa
    const handleOpenAdd = () => {
        setEditingStudent(null);
        setFormData({
            nama: '',
            nis: '',
            kelas: 'XII-A',
            jenisKelamin: 'Laki-laki',
            status: 'Aktif',
        });
        setIsFormOpen(true);
    };

    // Buka Modal Edit Siswa
    const handleOpenEdit = (student: Student) => {
        setEditingStudent(student);
        setFormData({
            nama: student.nama,
            nis: student.nis,
            kelas: student.kelas,
            jenisKelamin: student.jenisKelamin,
            status: student.status,
        });
        setIsFormOpen(true);
    };

    // Tutup Modal Form
    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingStudent(null);
    };

    // Simpan Form (Tambah / Edit)
    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.nama.trim() || !formData.nis.trim()) {
            alert('Nama dan NIS wajib diisi!');
            return;
        }

        if (editingStudent) {
            // Update
            if (onEditStudent) {
                onEditStudent({
                    ...editingStudent,
                    ...formData,
                });
            }
            setSnackbar({
                open: true,
                message: `Data siswa "${formData.nama}" berhasil diperbarui!`,
                severity: 'success',
            });
        } else {
            // Create
            if (onAddStudent) {
                onAddStudent(formData);
            }
            setSnackbar({
                open: true,
                message: `Siswa baru "${formData.nama}" berhasil ditambahkan!`,
                severity: 'success',
            });
        }

        handleCloseForm();
    };

    // Buka Konfirmasi Hapus
    const handleOpenDelete = (student: Student) => {
        setDeletingStudent(student);
        setIsDeleteOpen(true);
    };

    // Konfirmasi Hapus Siswa
    const handleConfirmDelete = () => {
        if (deletingStudent && onDeleteStudent) {
            onDeleteStudent(deletingStudent.id);
            setSnackbar({
                open: true,
                message: `Data siswa "${deletingStudent.nama}" berhasil dihapus!`,
                severity: 'info',
            });
        }
        setIsDeleteOpen(false);
        setDeletingStudent(null);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
            }}
        >
            {/* Header Tabel - Menggunakan Flexbox */}
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                    borderBottom: '1px solid #f1f5f9',
                }}
            >
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Data Siswa
                        </Typography>
                        <Chip
                            label={`${filteredStudents.length} siswa`}
                            size="small"
                            color="primary"
                            sx={{ fontWeight: 700, height: 22, fontSize: 11 }}
                        />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Kelola direktori siswa: tambah, lihat, edit, dan hapus data.
                    </Typography>
                </Box>

                {/* Kontrol Aksi: Search & Tombol Tambah Siswa (Flexbox) */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                    {/* Search internal jika tidak disediakan dari Navbar */}
                    {!externalSearch && (
                        <TextField
                            size="small"
                            placeholder="Cari siswa, NIS, atau kelas..."
                            value={internalSearch}
                            onChange={(e) => {
                                setInternalSearch(e.target.value);
                                setPage(0);
                            }}
                            sx={{
                                width: { xs: '100%', sm: 240 },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    bgcolor: '#f8fafc',
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="action" fontSize="small" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    )}

                    {/* Tombol Tambah Siswa */}
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleOpenAdd}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 2,
                        }}
                    >
                        Tambah Siswa
                    </Button>
                </Box>
            </Box>

            {/* Tabel Data Siswa */}
            <TableContainer>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead sx={{ bgcolor: '#f8fafc' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>
                                NAMA SISWA
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>
                                NIS
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>
                                KELAS
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>
                                JENIS KELAMIN
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>
                                STATUS
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700, color: '#64748b' }}>
                                AKSI
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {displayedStudents.length > 0 ? (
                            displayedStudents.map((student) => (
                                <TableRow
                                    key={student.id}
                                    hover
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/* Kolom Nama dengan Flexbox */}
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Avatar
                                                sx={{
                                                    width: 36,
                                                    height: 36,
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    bgcolor:
                                                        student.jenisKelamin === 'Laki-laki'
                                                            ? '#dbeafe'
                                                            : '#fce7f3',
                                                    color:
                                                        student.jenisKelamin === 'Laki-laki'
                                                            ? '#1d4ed8'
                                                            : '#be185d',
                                                }}
                                            >
                                                {student.nama
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .slice(0, 2)
                                                    .join('')}
                                            </Avatar>
                                            <Typography sx={{ fontWeight: 600, fontSize: '0.92rem' }}>
                                                {student.nama}
                                            </Typography>
                                        </Box>
                                    </TableCell>

                                    <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                                        {student.nis}
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={student.kelas}
                                            size="small"
                                            variant="outlined"
                                            sx={{ fontWeight: 600, borderRadius: 1.5 }}
                                        />
                                    </TableCell>

                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            {student.jenisKelamin === 'Laki-laki' ? (
                                                <MaleIcon sx={{ color: '#0284c7', fontSize: 20 }} />
                                            ) : (
                                                <FemaleIcon sx={{ color: '#db2777', fontSize: 20 }} />
                                            )}
                                            <Typography sx={{ fontSize: '0.88rem' }}>
                                                {student.jenisKelamin}
                                            </Typography>
                                        </Box>
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={student.status}
                                            size="small"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: '0.75rem',
                                                bgcolor:
                                                    student.status === 'Aktif' ? '#dcfce7' : '#fee2e2',
                                                color:
                                                    student.status === 'Aktif' ? '#15803d' : '#b91c1c',
                                            }}
                                        />
                                    </TableCell>

                                    {/* Kolom Aksi CRUD (Edit & Hapus) */}
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => handleOpenEdit(student)}
                                                sx={{
                                                    bgcolor: '#eff6ff',
                                                    '&:hover': { bgcolor: '#dbeafe' },
                                                }}
                                                aria-label="Edit siswa"
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleOpenDelete(student)}
                                                sx={{
                                                    bgcolor: '#fef2f2',
                                                    '&:hover': { bgcolor: '#fee2e2' },
                                                }}
                                                aria-label="Hapus siswa"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} sx={{ textAlign: 'center', py: 5 }}>
                                    <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
                                        Tidak ada data siswa yang ditemukan.
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Silakan tambah data siswa baru atau sesuaikan pencarian Anda.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={filteredStudents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Baris per halaman:"
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}–${to} dari ${count}`
                }
            />

            {/* MODAL DIALOG: TAMBAH / EDIT SISWA */}
            <Dialog open={isFormOpen} onClose={handleCloseForm} maxWidth="sm" fullWidth>
                <form onSubmit={handleSubmitForm}>
                    <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
                        {editingStudent ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}
                    </DialogTitle>
                    <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2 }}>
                        <TextField
                            label="Nama Siswa"
                            placeholder="Contoh: Muhammad Rizky"
                            value={formData.nama}
                            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                            required
                            fullWidth
                            size="small"
                        />

                        <TextField
                            label="NIS"
                            placeholder="Contoh: 2026013"
                            value={formData.nis}
                            onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                            required
                            fullWidth
                            size="small"
                        />

                        <FormControl fullWidth size="small">
                            <InputLabel id="select-kelas-label">Kelas</InputLabel>
                            <Select
                                labelId="select-kelas-label"
                                label="Kelas"
                                value={formData.kelas}
                                onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                            >
                                {defaultClasses.map((cls) => (
                                    <MenuItem key={cls} value={cls}>
                                        {cls}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                            <InputLabel id="select-gender-label">Jenis Kelamin</InputLabel>
                            <Select
                                labelId="select-gender-label"
                                label="Jenis Kelamin"
                                value={formData.jenisKelamin}
                                onChange={(e) =>
                                    setFormData({ ...formData, jenisKelamin: e.target.value as 'Laki-laki' | 'Perempuan' })
                                }
                            >
                                <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                                <MenuItem value="Perempuan">Perempuan</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                            <InputLabel id="select-status-label">Status Siswa</InputLabel>
                            <Select
                                labelId="select-status-label"
                                label="Status Siswa"
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({ ...formData, status: e.target.value as 'Aktif' | 'Non-Aktif' })
                                }
                            >
                                <MenuItem value="Aktif">Aktif</MenuItem>
                                <MenuItem value="Non-Aktif">Non-Aktif</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, py: 2 }}>
                        <Button onClick={handleCloseForm} color="inherit" sx={{ textTransform: 'none' }}>
                            Batal
                        </Button>
                        <Button type="submit" variant="contained" color="primary" sx={{ textTransform: 'none', fontWeight: 600 }}>
                            {editingStudent ? 'Simpan Perubahan' : 'Tambah Siswa'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* MODAL DIALOG: KONFIRMASI HAPUS */}
            <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                <DialogTitle sx={{ fontWeight: 700, color: 'error.main' }}>
                    Konfirmasi Hapus Data
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Apakah Anda yakin ingin menghapus data siswa <strong>{deletingStudent?.nama}</strong> (NIS: {deletingStudent?.nis})?
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                        Data akan dihapus dari daftar siswa secara langsung.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button onClick={() => setIsDeleteOpen(false)} color="inherit" sx={{ textTransform: 'none' }}>
                        Batal
                    </Button>
                    <Button onClick={handleConfirmDelete} variant="contained" color="error" sx={{ textTransform: 'none', fontWeight: 600 }}>
                        Hapus Data
                    </Button>
                </DialogActions>
            </Dialog>

            {/* SNACKBAR FEEDBACK */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%', fontWeight: 600 }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
}
