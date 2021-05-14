import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
//
import InputText from '../../../components/CustomElements/InputText.jsx';
import InputNumber from '../../../components/CustomElements/InputNumber.jsx';
import SelectOption from '../../../components/CustomElements/SelectOption.jsx';
import ClientLayout from '../../../layouts/ClientLayout.jsx';
//
import Global from '../../global.js';
import classes from './index.module.scss';

const Account = (props) => {
    const router = useRouter();
    const [cookies, setCookie] = useCookies('account');
    //
    const [user, setUser] = useState(props.user);

    console.log(user);

    function OnChainge(e, value, prop) {
        user[prop] = value;
        setUser({...user});
    }

    function OnClick(e) {
        const id = user._id;
        delete user._id;
        //
        fetch(`${Global.url}/api/db/users/update?prop=${JSON.stringify(user)}&id=${id}&operator=${'$replace'}`)
        .then((res) => {
            console.log('Успех!');
            return res.json();
        })
        .then((res) => {
            alert('Вы успешно изменили информацию о себе');
            setCookie('account', {...user, role: 'users' });
        })
        .catch((err) => {
            console.log('Ошибка!');
            return err.json();
        })
        .catch((err) => {
            console.log(err);
            alert('Произошла непредвиденная ошибка');
        })
        .finally(() => {
            location.reload();
        });
    }   

    function GenerateContent() {
        const account = cookies.account;
        //
        if(account && account.role == 'users' && 
           account.login == user.login && 
           account.password == user.password)
        {
            // function Generate


            return <div className={classes.account}>
                <div className={classes.greetings}>
                    <h1>Информация о вас</h1>
                </div>
                {/*  */}
                <InputText title='Логин'
                value={user.login}
                className={classes.input + ' ' + classes.login}
                onChainge={(e, value) => OnChainge(e, value, 'login')}/>
                {/*  */}
                <InputText title='Пароль'
                value={user.password}
                isPassword='true'
                className={classes.input + ' ' + classes.password}
                onChainge={(e, value) => OnChainge(e, value, 'password')}/>
                {/*  */}
                <InputText title='Имя'
                value={user.name}
                className={classes.input + ' ' + classes.name}
                onChainge={(e, value) => OnChainge(e, value, 'name')}/>
                {/*  */}
                <InputText title='Фамилия'
                value={user.surname}
                className={classes.input + ' ' + classes.surname}
                onChainge={(e, value) => OnChainge(e, value, 'surname')}/>
                {/*  */}
                <InputText title='Отчество'
                value={user.middle_name}
                className={classes.input + ' ' + classes.middle_name}
                onChainge={(e, value) => OnChainge(e, value, 'middle_name')}/>
                {/*  */}
                <InputText title='Телефон'
                value={user.telephone}
                className={classes.input + ' ' + classes.telephone}
                onChainge={(e, value) => OnChainge(e, value, 'telephone')}/>
                {/*  */}
                <SelectOption title='Пол'
                values={[ 'Мужской', 'Женский' ]}
                className={classes.input + ' ' + classes.gender}
                onChainge={(e, value) => OnChainge(e, value, 'gender')}/>
                {/*  */}
                <button className={classes.button} onClick={OnClick}>
                    Принять изменения
                </button>
            </div>;
        }
        else
            return;
    }

    return (
        <ClientLayout title='Личный кабинет'>
            <div className={classes.wrapper}>
                {GenerateContent()}
            </div>
        </ClientLayout>
    )
}

export async function getStaticPaths() {
    const paths = []
    //
    const res = await fetch(`${Global.url}/api/db/users`);
    const users = await res.json();
    //
    users.forEach((element) => paths.push({ params: { id: element._id } }));
    return {
        paths: paths,
        fallback: false
    };
}

export async function getStaticProps(router) {
    const id_user = router.params.id;
    //
    const res = await fetch(`${Global.url}/api/getUser?id_user=${id_user}&get_relaxes=${true}`);
    const user = await res.json();
    //
    return {
        props: {
            user: user
        }
    };
}

export default Account;