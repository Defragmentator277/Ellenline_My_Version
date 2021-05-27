import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
//
import ModalWindow from '../components/Common/ModalWindow/ModalWindow.jsx';

const Error404 = () => {

    useEffect(() => {
        document.title = '404';
    }, [])

    return (
        <ModalWindow title='Ошибка 404!' buttons={{close: false}}>
            <h2 style={{margin: '5px'}}>Такой страницы не существует</h2>
        </ModalWindow>
    )
}

export default Error404;