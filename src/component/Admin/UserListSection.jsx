import React from 'react';
import axios from 'axios';
import constants from '../../lib/constants';
import '../../assets/css/userlist.css';

function UserListSection({ userlist, pageNo, setUserlist }) {

    const onAuthHandler = (e) => {
        const { id, name, value } = e.target;
        setUserlist(userlist.map(user =>
                user.id === id ? {
                    ...user,
                    [name] : value,
                    
                } : user
        ));

        const select_user = userlist.filter(user => user.id === id );

        console.log(select_user);

        axios({
            method: `POST`,
            url: constants.BackUrl + `/api/v1/inventory/admin/change-auth?level=${value}`,
            data : {
                id: select_user[0].id,
                email: select_user[0].email,
                name: select_user[0].name,
                utoken: select_user[0].utoken,
                uauth: select_user[0].uauth,
                productGroup: select_user[0].productGroup,
                tel: select_user[0].tel
            }
        }).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        });
    }

    return (
        <table className="userlist_table">
            <colgroup>
                    <col style={{ width: "25%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "40%" }} />
                    <col style={{ width: "15%" }} />
            </colgroup>
            <thead>
                <tr>
                    <td>아이디</td>
                    <td>이름</td>
                    <td>이메일</td>
                    <td>권한</td>
                </tr>
            </thead>
            <tbody>
                {userlist.map((user, index) => {
                    if((pageNo-1)*10<= index && index < pageNo*10){
                        return(
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select className="user_uauth_select" name="uauth" id={user.id} defaultValue={user.uauth} onChange={onAuthHandler}>
                                        <option value="0">없음</option>
                                        <option value="1">일반유저</option>
                                        <option value="2">관리자</option>
                                    </select>
                                </td>
                            </tr>
                        )
                    }else{
                        return null;
                    }
                })}
            </tbody>
        </table>
    )
}

export default UserListSection;