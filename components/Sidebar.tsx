'use client';

import {
    Box,
    Typography,
    Button,
    Divider,
    Avatar,
    Badge,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolIcon from '@mui/icons-material/School';

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
    activeMenu: string;
    onMenuSelect: (menu: string) => void; 
}

const menuItems = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        id: 'students',
        title: 'Data Siswa',
        icon: <PeopleIcon />,
    },
    {
        id: 'settings',
        title: 'Pengaturan',
        icon: <SettingsIcon />,
    },
];

export default function Sidebar({
    mobileOpen,
    onClose,
    activeMenu,
    onMenuSelect,
}: SidebarProps) {
    return (
        <>
            {mobileOpen && (
                <Box
                    onClick={onClose}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        position: 'fixed',
                        inset: 0,
                        bgcolor: 'rgba(0,0,0,0.4)',
                        zIndex: 1200,
                    }}
                />
            )}

            <Box
                component="aside"
                sx={{
                    width: 260,
                    minWidth: 260,
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: { xs: mobileOpen ? 0 : -260, md: 0 },
                    zIndex: 1201,
                    bgcolor: '#ffffff',
                    borderRight: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    transition: 'left 0.3s ease',
                }}
            >
                {/* Logo & Identitas Aplikasi */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        mb: 4,
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        onMenuSelect('dashboard');
                        onClose();
                    }}
                >
                    <SchoolIcon color="primary" fontSize="large" />

                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700 }}
                    >
                        StudentApp
                    </Typography>
                </Box>

                {/* Menu Navigasi - Flexbox Vertikal */}
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 2, fontWeight: 700, letterSpacing: '0.05em' }}
                >
                    MENU UTAMA
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    {menuItems.map((item) => {
                        const isActive = activeMenu === item.id;
                        return (
                            <Button
                                key={item.id}
                                onClick={() => {
                                    onMenuSelect(item.id);
                                    onClose();
                                }}
                                startIcon={item.icon}
                                fullWidth
                                sx={{
                                    justifyContent: 'flex-start',
                                    py: 1.5,
                                    px: 2,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: isActive ? 700 : 500,
                                    color: isActive ? '#2563eb' : '#64748b',
                                    bgcolor: isActive ? '#eff6ff' : 'transparent',
                                    '&:hover': {
                                        bgcolor: '#eff6ff',
                                        color: '#2563eb',
                                    },
                                }}
                            >
                                {item.title}
                            </Button>
                        );
                    })}
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                {/* Informasi Profil Pengguna di Bagian Bawah Sidebar (Flexbox) */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: 2.5,
                        bgcolor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        mb: 2,
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
                                width: 38,
                                height: 38,
                                fontSize: 13,
                                fontWeight: 700,
                            }}
                        >
                            AA
                        </Avatar>
                    </Badge>

                    <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 700,
                                fontSize: 13,
                                lineHeight: 1.2,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Affan Athaillah
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block', fontSize: 11 }}
                        >
                            Admin (Online)
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="caption" color="text.secondary">
                    Student Management System
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    Version 1.0.0
                </Typography>
            </Box>
        </>
    );
}
