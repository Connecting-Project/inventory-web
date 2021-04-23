import React, {useContext} from 'react';
import sessionStorageCustom from '../lib/sessionStorageCustom';
import { GlobalStateContext } from '../App';
import { GoogleLogout } from 'react-google-login';
import '../assets/css/main.css';

function UserPage() {


    const admin = sessionStorageCustom.getJsonItem('admin');
    const user = sessionStorageCustom.getJsonItem('user');

    const { setAdminState, setLoginState } = useContext(GlobalStateContext);

    const onAdminLogoutHandler = () => {
        setAdminState(false);
        sessionStorage.clear();
    };

    const onUserLogoutHandler = () => {
        setLoginState(false);
        sessionStorage.clear();
    };

    return (
        <header id="header">
            {admin && <a href="/admin" className="logo"><strong>Hawaiian-Pizza</strong> INVENTORY</a>}
            {user && <a href="/main" className="logo"><strong>Hawaiian-Pizza</strong> INVENTORY</a>}
            {!admin && !user && <a href="/main" className="logo"><strong>Hawaiian-Pizza</strong> INVENTORY</a>}
            <ul className="icons">
                {admin && <li>{admin.name}님 안녕하세요.</li>}
                {admin && <li><a href="/" onClick={onAdminLogoutHandler}>로그아웃</a></li>}
                {user && <li>{user.name}님 안녕하세요.</li>}
                {user && <li><a href="/mypage">마이페이지</a></li>}
                {user && user.uauth === 2 && <li><a href="/admin">관리자페이지</a></li>}
                {user && user.uauth === 2 && <li><a href="/main">유저페이지</a></li>}

                {user && <li className="logout_btn">
                    <GoogleLogout
                        clientId="462452844066-s6vfip9ifc94hj1jkma2jbe8g5p2ljaj.apps.googleusercontent.com"
                        buttonText="로그아웃"
                        onLogoutSuccess={onUserLogoutHandler}
                    >
                    </GoogleLogout>
                </li>}
            </ul>
        </header>
    );
}

export default UserPage;