import React from 'react';
import Link from 'next/link';
//
import classes from './AdminHeader.module.scss';

const AdminHeader = (props) => {

    return (
        <div className={classes.header}>
            <div className={classes.item}>
                <Link href='/admin/db'>База данных</Link>
            </div>
            <div className={classes.item}>
                <Link href='/admin/activity'>Активность на сайте</Link>
            </div>
            <div className={classes.item}>
                <Link href='/admin/staff'>Сотрудники</Link>
            </div>
            <div className={classes.item}>
                <Link href='/admin/orders'>Заказы</Link>
            </div>
        </div>
    )
}

export default AdminHeader;