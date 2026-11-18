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
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Student } from '../data/student';

interface StudentTableProps {
    students: Student[];
    searchQuery?: string;
}

export default function StudentTable({
    students,
    searchQuery: externalSearch = '',
}: StudentTableProps) {
    const [internalSearch, setInternalSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const query = (externalSearch || internalSearch).toLowerCase().trim();

    const filteredStudents = students.filter(
        (student) =>
            student.nama.toLowerCase().includes(query) ||
            student.nis.toLowerCase().includes(query) ||
            student.kelas.toLowerCase().includes(query)
    );

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
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Data Siswa
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Menampilkan daftar seluruh siswa yang terdaftar
                    </Typography>
                </Box>

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
                            width: { xs: '100%', sm: 260 },
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
            </Box>

            {/* Tabel Data Siswa */}
            <TableContainer>
                <Table sx={{ minWidth: 650 }}>
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
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography color="text.secondary">
                                        Tidak ada data siswa yang sesuai pencarian.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10]}
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
        </Paper>
    );
}
