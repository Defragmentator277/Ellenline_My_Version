import React, { useEffect } from 'react';
import { Router, useRouter } from 'next/router';
//
import ModalWindow from '../components/Common/ModalWindow/ModalWindow.jsx';

const Error404 = () => {
    const router = useRouter();

    useEffect(() => {
        document.title = '404';
    }, [])

    function OnClose() {
        router.push('/home');
    }

    return (
        <ModalWindow title='Ошибка 404!' onClose={() => OnClose()}>
            <h2 style={{margin: '5px'}}>Такой страницы не существует</h2>
        </ModalWindow>
    )
}

export default Error404;