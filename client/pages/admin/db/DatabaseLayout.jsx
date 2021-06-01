import React from 'react';
import { useRouter } from 'next/router';
//
import AdminLayout from '../../../layouts/AdminLayout.jsx';
import AsideMenu from '../../../components/CommonAdmin/AsideMenu/AsideMenu.jsx';
import ModalWindow from '../../../components/Common/ModalWindow/ModalWindow.jsx';
//
import Global from '../../global.js';
import classes from './DatabaseLayout.module.scss';

//Обертка для страниц БД
const DatabaseLayout = (props) => {
    //Нужен для маршрутизации по страницам
    const router = useRouter();
    //Содержимое обертки
    const children = props.children;
    //Название страницы, по умолчанию База данныъ
    const title = props.title || 'База данных';
    //Массив для создания списка слева меню, получение перевода названия коллекции
    const items = props.items;
    //Получение аккаунта сотрудника из Cookie
    const account_worker = Global.getCookie('account_worker');

    //Генерация основого контента
    function GenerateContent() {    
        if(account_worker && account_worker.role == 'admins')
            //В случаи если сотрудник существует и его роль администратор
            //происходит генерация таблиц БД
            return <div className={classes.main}>
                <AsideMenu items={items} root='db' className={classes.aside}/>
                <div className={classes.article}>
                    {children}
                </div>
            </div>;
        else
            //В случаи если сотрудник не существует и его роль не администратор
            //вывод информации о ошибки, и последующее перекидвание на главную страницу
            return <ModalWindow title='Ошибка!' onClose={() => { router.push('/admin') }}>
                <div className={classes.text}>
                    У вас нет прав на просмотр или изменения БД!
                </div>
            </ModalWindow>;
    }

    return(
        <AdminLayout title={title}>
            {GenerateContent()}
        </AdminLayout>
    )
}

export default DatabaseLayout;