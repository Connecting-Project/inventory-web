import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import constants from '../lib/constants';

import '../assets/css/exist.css';

function Exist(){
    const location = useLocation();
    const history = useHistory();

    useEffect(()=>{
        axios({
            method:`GET`,
            url: constants.BackUrl+ `/api/v1/inventory/admin/admin-check`
        }).then((response)=>{
            setTimeout(()=>{
                if(response.data === true){
                    history.push(`/user_login`);
                }else{
                    history.push(`/join`);
                }
            },2000)
            
        }).catch((error)=>{
            console.log(error);
        })
    },[location])

    return (
        <div className="loading-container">
            <div className="loading"></div>
            <div id="loading-text">loading</div>
        </div>
    );
}

export default Exist;