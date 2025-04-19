"use client";

import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Greeting() {
    // Start with an empty string to avoid hydration mismatch
    const [greeting, setGreeting] = useState<string>('');
    // Track if the component has mounted on the client
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Mark component as mounted on client
        setIsMounted(true);

        const getGreeting = () => {
            const hour = new Date().getHours();
            if (hour < 12) return 'Good morning';
            if (hour < 18) return 'Good afternoon';
            return 'Good evening';
        };

        setGreeting(getGreeting());

        // Update greeting every minute
        const interval = setInterval(() => {
            setGreeting(getGreeting());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    // Only show the greeting after client-side hydration is complete
    return (
        <Typography variant="h6" component="div">{isMounted ? greeting : ''}</Typography>
    );
} 