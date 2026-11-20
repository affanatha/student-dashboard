'use client';

import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Avatar,
    IconButton,
    Badge,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

interface NavbarProps {
    onMenuClick: () => void;
    title?: string;
    subtitle?: string;
    searchQuery?: string;
    onSearchChange?: (val: string) => void;
    onNavigateSettings?: () => void;
    showSearch?: boolean;
}

export default function Navbar({
    onMenuClick,
    title = 'Dashboard',
    subtitle = 'Selamat datang di StudentApp',
    searchQuery = '',
    onSearchChange,
    showSearch = false,
}: NavbarProps) {
    return (
        <Box
            component="header"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                p: { xs: 2, md: 3 },
                bgcolor: '#ffffff',
                borderBottom: '1px solid #e2e8f0',
                minHeight: 85,
            }}
        >
            {/* Bagian kiri: Hamburger + Judul Halaman */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <IconButton
                    onClick={onMenuClick}
                    sx={{ display: { xs: 'inline-flex', md: 'none' } }}
                    aria-label="Buka menu"
                >
                    <MenuIcon />
                </IconButton>

                <Box>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700 }}
                    >
                        {title}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                        {subtitle}
                    </Typography>
                </Box>
            </Box>

            {/* Bagian kanan: Search (hanya di menu tertentu) + Notifikasi + Profil Pengguna */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1, md: 2 },
                }}
            >
                {showSearch && (
                    <TextField
                        size="small"
                        placeholder="Cari siswa..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                        sx={{
                            width: { xs: 130, sm: 200, md: 240 },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: '#f8fafc',
                            },
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                )}

                <IconButton aria-label="Notifikasi">
                    <Badge color="error" variant="dot">
                        <NotificationsNoneIcon />
                    </Badge>
                </IconButton>

                {/* Profil Pengguna Statis & Bersih (Tanpa Pop up saat diklik) */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2,
                        p: 0.8,
                        borderRadius: 2.5,
                    }}
                >
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        sx={{
                            '& .MuiBadge-badge': {
                                bgcolor: '#10b981',
                                color: '#10b981',
                                boxShadow: '0 0 0 2px #fff',
                            },
                        }}
                    >
                        <Avatar
                            sx={{
                                bgcolor: '#2563eb',
                                width: 40,
                                height: 40,
                                fontSize: 14,
                                fontWeight: 700,
                            }}
                        >
                            AA
                        </Avatar>
                    </Badge>

                    <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'left' }}>
                        <Typography
                            sx={{ fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}
                        >
                            Affan Athaillah
                        </Typography>

                        <Typography color="text.secondary" sx={{ fontSize: 11, fontWeight: 500 }}>
                            Administrator
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
