'use client';

import { isAuthenticated } from './auth';

export default function Home() {
    if (typeof window !== 'undefined') {
        if (isAuthenticated()) {
            window.location.href = '/produtos';
        } else {
            window.location.href = '/login';
        }
        return null;
    }
    return null;
}
