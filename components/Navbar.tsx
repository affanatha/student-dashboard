'use client';

import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Badge,
    Chip,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';

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
    onNavigateSettings,
    showSearch = false,
}: NavbarProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isProfileMenuOpen = Boolean(anchorEl);

    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

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

                {/* Profil Pengguna Interaktif (Flexbox horizontal) */}
                <Box
                    onClick={handleProfileClick}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2,
                        cursor: 'pointer',
                        p: 0.8,
                        borderRadius: 2.5,
                        transition: 'background-color 0.2s',
                        '&:hover': {
                            bgcolor: '#f1f5f9',
                        },
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

                    <KeyboardArrowDownIcon
                        sx={{
                            color: 'text.secondary',
                            fontSize: 18,
                            display: { xs: 'none', sm: 'block' },
                            transition: 'transform 0.2s',
                            transform: isProfileMenuOpen ? 'rotate(180deg)' : 'none',
                        }}
                    />
                </Box>

                {/* Popover / Menu Dropdown Informasi Pengguna Lengkap */}
                <Menu
                    anchorEl={anchorEl}
                    open={isProfileMenuOpen}
                    onClose={handleProfileClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    slotProps={{
                        paper: {
                            elevation: 4,
                            sx: {
                                mt: 1.5,
                                minWidth: 260,
                                borderRadius: 3,
                                border: '1px solid #e2e8f0',
                                overflow: 'visible',
                                p: 1,
                            },
                        },
                    }}
                >
                    {/* Header Profil Lengkap */}
                    <Box sx={{ px: 2, py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Avatar
                                sx={{
                                    bgcolor: '#2563eb',
                                    width: 44,
                                    height: 44,
                                    fontSize: 16,
                                    fontWeight: 700,
                                }}
                            >
                                AA
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                    Affan Athaillah
                                </Typography>
                                <Chip
                                    label="Super Admin"
                                    size="small"
                                    color="primary"
                                    sx={{ height: 20, fontSize: '0.7rem', fontWeight: 700, mt: 0.3 }}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, pt: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="caption" color="text.secondary">
                                    affan@sekolah.sch.id
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BadgeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="caption" color="text.secondary">
                                    NIP: 19980512 202401 1 001
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    {/* Menu Navigasi Pengguna */}
                    <MenuItem
                        onClick={() => {
                            handleProfileClose();
                            if (onNavigateSettings) onNavigateSettings();
                        }}
                        sx={{ borderRadius: 1.5, py: 1 }}
                    >
                        <ListItemIcon>
                            <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                                    Profil Saya
                                </Typography>
                            }
                        />
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            handleProfileClose();
                            if (onNavigateSettings) onNavigateSettings();
                        }}
                        sx={{ borderRadius: 1.5, py: 1 }}
                    >
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                                    Pengaturan Akun
                                </Typography>
                            }
                        />
                    </MenuItem>

                    <Divider sx={{ my: 1 }} />

                    <MenuItem
                        onClick={handleProfileClose}
                        sx={{ borderRadius: 1.5, py: 1, color: '#ef4444' }}
                    >
                        <ListItemIcon sx={{ color: '#ef4444' }}>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#ef4444' }}>
                                    Keluar
                                </Typography>
                            }
                        />
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}
