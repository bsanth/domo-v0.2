"use client";

import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Greeting from './Greeting';

export default function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h5"
                    component="div"
                    color="primary"
                    sx={{
                        fontWeight: 'bold',
                        flexGrow: 1
                    }}>
                    Domo
                </Typography>
            </Toolbar>
        </AppBar>
    );
} 