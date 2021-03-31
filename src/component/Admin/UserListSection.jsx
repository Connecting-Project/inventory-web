import React from 'react';

function UserListSection({ userlist, pageNo }) {

    return (
        <table>
            <colgroup>
                    <col style={{ width: "25%" }} />
                    <col style={{ width: "25%" }} />
                    <col style={{ width: "35%" }} />
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
                                <td>{user.uauth}</td>
                            </tr>
                        )
                    }
                })}
            </tbody>
        </table>
    )
}

export default UserListSection;