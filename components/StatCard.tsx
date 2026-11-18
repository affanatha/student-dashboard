
import {
    Card,
    Box,
    Typography,
} from '@mui/material';

import { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    value: number;
    icon: ReactNode;
    color: string;
    background: string;
}

export default function StatCard({
    title,
    value,
    icon,
    color,
    background,
}: StatCardProps) {
    return (
        <Card
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease',

                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                {/* Informasi statistik */}
                <Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: '#1e293b',
                        }}
                    >
                        {value}
                    </Typography>
                </Box>

                {/* Icon */}
                <Box
                    sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 2,
                        backgroundColor: background,
                        color: color,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexShrink: 0,
                    }}
                >
                    {icon}
                </Box>
            </Box>
        </Card>
    );
}
