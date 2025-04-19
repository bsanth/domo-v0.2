"use client";

import { Card, CardContent, Stack, Typography, Box } from '@mui/material';
import VideocamIconRounded from '@mui/icons-material/VideocamRounded';
import Greeting from './Greeting';

export default function CameraCard() {
    return <Stack spacing={3}>
        <Greeting />

        <Card sx={{
            width: {
                xs: '100%',  // Full width on extra small screens
                sm: '250px', // Fixed width on small screens and up
            },
            aspectRatio: '1 / 1', // Square aspect ratio
            margin: { xs: 1, sm: 2 }, // Responsive margins
            boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.05)',
            transition: 'all 0.2s ease',
            '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                transform: 'scale(1.03)',
            },
            '&:active': {
                transform: 'scale(0.98)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                backgroundColor: 'rgba(0,0,0,0.02)'
            },
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            <CardContent sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: { xs: 2, sm: 3 }
            }}>
                <Box sx={{
                    fontSize: { xs: 40, sm: 50 },
                    marginBottom: 2,
                    color: 'primary.main',
                }}>
                    <VideocamIconRounded fontSize="inherit" />
                </Box>
                <Typography
                    variant="h6"
                    component="div"
                    align="center"
                    sx={{
                        fontWeight: 500,
                        letterSpacing: '0.5px'
                    }}
                >
                    Cameras
                </Typography>
            </CardContent>
        </Card>
    </Stack>
} 