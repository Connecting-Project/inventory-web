import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import { GlobalStateContext } from '../App';
import sessionStorageCustom from '../lib/sessionStorageCustom';
import constants from '../lib/constants';

import '../assets/css/login.css';

function Login() {
    const history = useHistory();
    const { loginState, adminState, setLoginState , setAdminState } = useContext(GlobalStateContext);

    const [state, setState] = useState({
        id: '',
        pw: '',
    });

    useEffect(()=>{
        if(adminState){
            history.push(`/admin`);
        }else if(loginState){
            history.push(`/main`);
        }
    });

    const onMovepage = (str) => {
        history.push(`/${str}`);
    }

    const onLoginHandler = (e) => {
        const {name , value} = e.target;
        setState({
            ...state,
            [name] : value,
        });
    }

    const resSuccessGoogle = (response) => {
        console.log(response);
        axios({
            method:'POST',
            url:constants.BackUrl+`/api/v1/inventory/accounts/login`,
            data:{
                id : response.profileObj.googleId,
                email : response.profileObj.email,
                name : response.profileObj.name,
                access_token : response.accessToken,
            }
        }).then((res)=>{
            if(res.data.uauth === 0){
                alert("해당 계정은 권한이 없습니다.");
            }else{
                sessionStorageCustom.setJsonItem('user',{
                    id : response.profileObj.googleId,
                    email : response.profileObj.email,
                    name : response.profileObj.name,
                    access_token : response.accessToken,
                });
                setLoginState(true);
                history.push(`/main`);
            }
            

        }).catch((error)=>{
            console.log(error);
        });
    };

    const resFailGoogle = (response) => {
        console.log(response);
    };


    const onLocalLogin = () => {
        axios({
            method:'POST',
            url:constants.BackUrl + `/api/v1/inventory/admin/login`,
            data:{
                id: state.id,
                pwd: state.pw,
            }
        }).then((response)=>{
            console.log(response);
            
            sessionStorageCustom.setJsonItem('admin',{
                id : response.data.id,
                email : response.data.email,
                name : response.data.name,
                tel : response.data.tel,
            });
            setAdminState(true);
            history.push(`/admin`);
            
        }).catch((error)=>{
            console.log(error);
        })
    }

    return (
        <div className="login_container">
            <div className="login-page">
                <div className="form">

                    <h3>Admin Login</h3>
                    <input type="text" className="login_input" placeholder="아이디" name="id" value={state.id} onChange={onLoginHandler}/>
                    <input type="password" className="login_input" placeholder="비밀번호" name="pw" value={state.pw} onChange={onLoginHandler}/>
                    <button className="login_btn" onClick={onLocalLogin}>로그인</button>
                    <div className="link_btns">
                        <span className="mvjoin_btn" onClick={()=>{onMovepage("join")}}>회원가입</span>
                    </div>
                    <hr/>
                    <h3>User Login</h3>
                    <GoogleLogin
                        clientId="462452844066-s6vfip9ifc94hj1jkma2jbe8g5p2ljaj.apps.googleusercontent.com"
                        buttonText="Google 로그인"
                        onSuccess={resSuccessGoogle}
                        onFailure={resFailGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="google_login"
                    />

                </div>

            </div>
        </div>

    );
}

export default Login;