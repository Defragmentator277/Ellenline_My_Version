import { useRouter } from 'next/router';
import { useEffect } from 'react';
//
import ClientLayout from '../layouts/ClientLayout';
//
import Home from './home/index.jsx';

export default function App(){
    const router = useRouter();
    useEffect(() => {
        router.push('/home');
    }, []);
    //
    return <ClientLayout title="Загрузка"/>;
}
