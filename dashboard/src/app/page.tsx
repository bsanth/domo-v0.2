"use client";

import { Box, Container } from '@mui/material';
import Navbar from '@/components/Navbar';
import CameraCard from '@/components/CameraCard';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <CameraCard />
      </Container>
    </Box>
  );
}
