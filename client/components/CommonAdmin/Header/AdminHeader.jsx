import React from 'react';
import Link from 'next/link';
//
import Global from '../../../pages/global.js';
import classes from './AdminHeader.module.scss';

const AdminHeader = (props) => {
    const account_worker = Global.getCookie('account_worker');
    //
    function GenerateContent() {
        if(!account_worker)
            return;
        //Кнопки находящиеся на каждой форме
        const buttons = [];
        switch(account_worker.role)
        {
            case 'managers':
                return <>
                    {buttons}
                    <div className={classes.item}>
                        <Link href='/admin/orders'>Заказы</Link>
                    </div>
                </>;
            case 'admins':
                return <>
                    {buttons}
                    <div className={classes.item}>
                        <Link href='/admin/db'>База данных</Link>
                    </div>
                </>;
            default:
                return 'ERROR this type of User don`t exists';
        }
    }

    return (
        <div className={classes.header}>
            {GenerateContent()}
        </div>
    )
}

export default AdminHeader;