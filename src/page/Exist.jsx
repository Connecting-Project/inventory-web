import React, { useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import constants from '../lib/constants';
import { GlobalStateContext } from '../App';
import sessionStorageCustom from '../lib/sessionStorageCustom';

import '../assets/css/exist.css';

function Exist(){
    const location = useLocation();
    const history = useHistory();

    const { setExist } = useContext(GlobalStateContext);

    useEffect(()=>{
        axios({
            method:`GET`,
            url: constants.BackUrl+ `/api/v1/inventory/admin/admin-check`
        }).then((response)=>{
            setTimeout(()=>{
                if(response.data === true){
                    sessionStorageCustom.setJsonItem('exist',{
                        status: true,
                    });
                    setExist(true);
                    history.push(`/user_login`);
                }else{
                    history.push(`/join`);
                }
            },1000)
            
        }).catch((error)=>{
            console.log(error);
        })
    },[location, history, setExist])

    return (
        <div className="loading-container">
            <div className="loading"></div>
            <div id="loading-text">loading</div>
        </div>
    );
}

export default Exist;