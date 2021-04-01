import React, { useContext, useState, useEffect} from 'react';
import '../assets/css/login.css';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { GlobalStateContext } from '../App';
import sessionStorageCustom from '../lib/sessionStorageCustom';
import constants from '../lib/constants';

function AdminLogin(){
    const history = useHistory();

    const { loginState, adminState, setAdminState } = useContext(GlobalStateContext);

    // 로그인이 되어있을 경우 해당페이지에서 팅겨냄.
    useEffect(()=>{
        if(adminState){
            history.push(`/admin`);
        }else if(loginState){
            history.push(`/main`);
        }
    });

    const [state, setState] = useState({
        id: '',
        pw: '',
    });

    const onLoginHandler = (e) => {
        const {name , value} = e.target;
        setState({
            ...state,
            [name] : value,
        });
    }

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

    return(
        <div className="login_container">
            <div className="login-page">
                <div className="form">

                    <h3>Admin Login</h3>
                    <input type="text" className="login_input" placeholder="아이디" name="id" value={state.id} onChange={onLoginHandler}/>
                    <input type="password" className="login_input" placeholder="비밀번호" name="pw" value={state.pw} onChange={onLoginHandler}/>
                    <button className="login_btn" onClick={onLocalLogin}>로그인</button>
                </div>

            </div>
        </div>
    );
}

export default AdminLogin;