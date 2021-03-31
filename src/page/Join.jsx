import React, { useEffect, useState } from 'react';
import Check from '../assets/img/check.png';

import '../assets/css/join.css';

import axios from 'axios';
import constants from '../lib/constants';
import { useHistory } from 'react-router-dom';

function Join() {
    const history = useHistory();

    useEffect(()=>{
        
    });

    const [state, setState] = useState({
        id: '',
        name: '',
        pw: '',
        pwck: '',
        email: '',
        detail: '',
        tel1: '',
        tel2: '',
        tel3: '',
        idck: false,
    })

    const [jboolean, setjBoolean] = useState(true);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        if (name === "id") {
            setState({
                ...state,
                [name]: value,
                idck: false,
            });
        } else if (name === "detail") {
            if (value === "직접입력") {
                setjBoolean(false);
                setState({
                    ...state,
                    [name]: '',
                });
            } else {
                setState({
                    ...state,
                    [name]: value,
                });
            }

        } else if(name === "tel2" || name === "tel3") {
            if(Number(e.nativeEvent.data) >= 0 && Number(e.nativeEvent.data) <= 9){
                setState({
                    ...state,
                    [name]: value,
                });
            }
        } else {
            setState({
                ...state,
                [name]: value,
            });
        }
    }

    const onIdCheckHandler = () => {
        let koreanck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        let english = /[a-z]/g;
        let number = /[0-9]/g;
        let reg = /^[a-z0-9]{7,14}$/;

        if (state.id === "") {
            alert('아이디를 입력해주세요.');
        } else if (koreanck.test(state.id) || !reg.test(state.id)) {
            alert('아이디는 영문+숫자조합으로 7~14글자 입력가능합니다.');
        } else if (english.test(state.id) && number.test(state.id) && reg.test(state.id)) {
            axios({
                method: 'GET',
                url: constants.BackUrl + `/api/v1/inventory/admin/id-check?id=${state.id}`
            }).then((response) => {
                console.log(response);
                if (response.data === "sucess") {
                    alert("사용해도 괜찮은 아이디입니다.");
                    setState({
                        ...state,
                        idck: true
                    });
                } else {
                    alert("이미 사용중인 아이디입니다.");
                }
            }).catch((error) => {
                console.log(error);
            })
        } else {
            alert('아이디는 영문+숫자조합으로 7~14글자 입력가능합니다.');
        }
    }

    const onSubmitHandler = () => {
        var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        let reg_pw = /^[a-z0-9]{7,14}$/;

        var email = state.email + "@" + state.detail;
        if (state.id.replace(" ", "") === "") {
            alert("아이디를 입력해주세요.");
        } else if (!state.idck) {
            alert("아이디 중복확인을 해주세요.");
        } else if (state.pw.replace(" ", "") === "" || state.pw !== state.pwck || !reg_pw.test(state.pw)) {
            alert("비밀번호를 다시 확인해주세요.");
        } else if (!reg_email.test(email)) {
            alert("이메일을 다시 확인해주세요.");
        } else if (state.tel1 === "" || state.tel2 === "" || state.tel3 === "") {
            console.log(state.tel1);
            console.log(state.tel2);
            console.log(state.tel3);

            alert("연락처를 다시 확인해주세요.");
        } else {
            axios({
                method: 'POST',
                url: constants.BackUrl + `/api/v1/inventory/admin/admin`,
                data: {
                    email: state.email + "@" + state.detail,
                    id: state.id,
                    name: state.name,
                    pw: state.pw,
                    tel: state.tel1 + "-" + state.tel2 + "-" + state.tel3,
                }
            }).then((response) => {
                alert("회원가입이 완료되었습니다.");
                history.push(`/admin_login`);
            }).catch((error) => {
                console.log(error);
            })
        }


    }

    return (
        <div className="join">
            <div className="join_container">
                <h2>회원가입</h2>
                <table className="join_inner">
                    <colgroup>
                        <col style={{ width: "150px" }} />
                        <col style={{ width: "180px" }} />
                        <col style={{ width: "180px" }} />
                        <col style={{ width: "180px" }} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>아이디</td>
                            <td colSpan="2"><input type="text" className="join_input" name="id" value={state.id} onChange={onChangeHandler} /></td>
                            <td><button className="id_check_btn" onClick={onIdCheckHandler}><img src={Check} alt="check" align="center" /> 중복확인</button></td>
                        </tr>
                        <tr>
                            <td>이름</td>
                            <td colSpan="2"><input type="text" className="join_input" name="name" value={state.name} onChange={onChangeHandler} /></td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td colSpan="2"><input type="password" className="join_input" name="pw" value={state.pw} onChange={onChangeHandler} /></td>
                            <td className="pw_limit">(영문+숫자 7-14글자 제한)</td>
                        </tr>
                        <tr>
                            <td>비밀번호 확인</td>
                            <td colSpan="2"><input type="password" className="join_input" name="pwck" value={state.pwck} onChange={onChangeHandler} /></td>
                        </tr>
                        <tr>
                            <td>연락처</td>
                            <td>
                                <select name="tel1" className="join_tel_select" onChange={onChangeHandler}>
                                    <option value="">선택</option>
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                    <option value="018">018</option>
                                    <option value="019">019</option>
                                </select> -
                        </td>
                            <td>
                                <input type="text" className="join_tel" name="tel2" value={state.tel2} onChange={onChangeHandler} /> -
                        </td>
                            <td>
                                <input type="text" className="join_tel" name="tel3" value={state.tel3} onChange={onChangeHandler} />
                            </td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td className="email_td" colSpan="2"><input type="text" className="join_input" name="email" value={state.email} onChange={onChangeHandler} /> @</td>
                            {jboolean && <td>
                                <select name="detail" className="join_selectbox" onChange={onChangeHandler}>
                                    <option value="">도메인 선택</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="hanmail.net">hanmail.net</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="nate.com">nate.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="hotmail.com">hotmail.com</option>
                                    <option value="lycos.co.kr">lycos.co.kr</option>
                                    <option value="empal.com">empal.com</option>
                                    <option value="cyworld.com">cyworld.com</option>
                                    <option value="yahoo.com">yahoo.com</option>
                                    <option value="paran.com">paran.com</option>
                                    <option value="dreamwiz.com">dreamwiz.com</option>
                                    <option value="직접입력">직접입력</option>
                                </select>
                            </td>}
                            {!jboolean && <td><input type="text" className="join_input" name="detail" value={state.detail} onChange={onChangeHandler} /></td>}
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4">
                                <button className="join_btn" onClick={onSubmitHandler}>가입하기</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

    );
}

export default Join;