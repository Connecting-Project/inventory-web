import React, { useState } from 'react';
import axios from 'axios';
import constants from '../../lib/constants';

import '../../assets/css/usersearch.css';

function UserSearch({setUserlist,setPageCount}) {

    const [name , setName] = useState('');

    const onEnterhandler = (e) => {
        if(e.key === "Enter"){
            axios({
                method: `GET`,
                url: constants.BackUrl + `/api/v1/inventory/admin/user-search?name=${name}`
            }).then((response)=>{
                setUserlist(response.data.userlist);
                setPageCount(Math.ceil(response.data.usercount/10));
                setName('');
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    return (
        <div className="user_search">
                <select className="user_search_select" name="user_search_select" id="">
                    <option value="이름">이름</option>
                </select>
                <input type="text" name="user_search_bar" className="user_search_bar" value={name} placeholder="Search" onChange={onNameChange} onKeyPress={onEnterhandler} />
        </div>
    )
}

export default UserSearch;