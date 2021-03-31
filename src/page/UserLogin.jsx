import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import { GlobalStateContext } from '../App';
import sessionStorageCustom from '../lib/sessionStorageCustom';
import constants from '../lib/constants';

import '../assets/css/login.css';

function UserLogin() {

    const history = useHistory();
    const { loginState, adminState, setLoginState , setAdminState } = useContext(GlobalStateContext);

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


    

    return (
        <div className="login_container">
            <div className="login-page">
                <div className="form">
                    <h3>User Login</h3>
                    <GoogleLogin
                        clientId="462452844066-s6vfip9ifc94hj1jkma2jbe8g5p2ljaj.apps.googleusercontent.com"
                        buttonText="Google 로그인"
                        onSuccess={resSuccessGoogle}
                        onFailure={resFailGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="google_login"
                    />
                    <div className="link_btns">
                        <span className="mvjoin_btn" onClick={()=>{onMovepage("admin_login")}}>관리자 로그인</span>
                    </div>
                </div>
                
            </div>
        </div>

    );
}

export default UserLogin;