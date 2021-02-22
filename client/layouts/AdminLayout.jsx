import React from 'react';
import Head from 'next/head';
//
import AdminHeader from '../components/CommonAdmin/Header/AdminHeader.jsx';
//
import classes from './AdminLayout.module.scss';

const AdminLayout = ({ children, title = 'Эллинлайн' }) => {

    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <AdminHeader/>
            <main className={classes.main}>
                {children}
            </main>
        </>
    )
}

export default AdminLayout;