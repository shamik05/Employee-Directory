'use client'

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const App = dynamic(() => import('../../src/App'), { ssr: false })

export const ClientOnly = () => {
    const router = useRouter();

    useEffect(() => {
        if (window.location.pathname !== '/') router.replace('/');
    }, [router])

    return <App />
}