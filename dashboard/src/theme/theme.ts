"use client";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff4d00',
        },
    },

    typography: {
        fontFamily: '"Roboto Mono", monospace',
    },
});

export default theme; 