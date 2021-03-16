import React, {useContext, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import { GlobalStateContext } from '../App';
import sessionStorageCustom from '../lib/sessionStorageCustom';
import constants from '../lib/constants';

function Login(){
    const history = useHistory();
    const { setLoginState } = useContext(GlobalStateContext);

    const onMovepage = (str) =>{
        history.push(`/${str}`);
    }

    const resSuccessGoogle = (response) => {
        console.log(response);
        // axios({
        //     method:'POST',
        //     url:constants.BackUrl+`/login/google`,
        //     data:{
        //         id : response.profileObj.googleId,
        //         email : response.profileObj.email,
        //         name : response.profileObj.name,
        //         access_token : response.accessToken,
        //         profile_image: response.profileObj.imageUrl,
        //     }
        // }).then((res)=>{
        //     sessionStorageCustom.setJsonItem('user',{
        //         type: 'google',
        //         id : response.profileObj.googleId,
        //         email : response.profileObj.email,
        //         name : response.profileObj.name,
        //         access_token : response.accessToken,
        //         profile_image: response.profileObj.imageUrl,
        //     });
        //     setLoginState(true);
        // }).catch((error)=>{
        //     console.log(error);
        // });
    };

    const resFailGoogle = (response) => {
    };

    return(
        <div>
            <GoogleLogin 
                    clientId="462452844066-s6vfip9ifc94hj1jkma2jbe8g5p2ljaj.apps.googleusercontent.com"
                    buttonText="로그인"
                    onSuccess={resSuccessGoogle}
                    onFailure={resFailGoogle}
                    cookiePolicy={'single_host_origin'}
                    className="google_login"
            />
        </div>
    ); 
}

export default Login;