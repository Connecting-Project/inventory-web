import React, { useEffect, useContext, useState } from 'react';
import axios from "axios";

import sesssionStorageCustom from '../lib/sessionStorageCustom';
import { GlobalStateContext } from '../App';
import constants from '../lib/constants';
import { useLocation, useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import "../assets/css/product.css";

function ProductDetail() {
    const classes = useStyles();
    const history = useHistory();

    const location = useLocation();

    const admin = sesssionStorageCustom.getJsonItem('admin');
    const user = sesssionStorageCustom.getJsonItem('user');

    const { setAdminState, setLoginState } = useContext(GlobalStateContext);

    const [product, setProduct] = useState({
        id: "",
        category: "",
        buy: "",
        manufacturer: "",
        productname: "",
        price: 0,
        quantity: 0,
        picture: "",
        sn: "",
        stock: 0,
        type: 0,
    });
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        axios({
            method: `GET`,
            url: constants.BackUrl + `/api/vi/inventory/products/detail?id=${location.pathname.substring(9)}`
        }).then((response) => {
            console.log(response);
            setProduct(response.data.product);
            setLogs(response.data.logs);
        }).catch((error) => {
            console.log(error);
        });
    }, [location]);

    const onAdminLogoutHandler = () => {
        setAdminState(false);
        sessionStorage.clear();
    };

    const onUserLogoutHandler = () => {
        setLoginState(false);
        sessionStorage.clear();
    };

    const onAdminBackHandler = () => {
        history.push(`/admin`);
    }

    const onUserBackHandler = () => {
        history.push(`/main`);
    }

    const onMoveUpdateHandler = () => {
        history.push(`/product/update/${location.pathname.substring(9)}`);
    }

    const onProductDeleteHandler = () => {
        axios({
            method:`DELETE`,
            url: constants.BackUrl + `/api/vi/inventory/products/?sn=${product.sn}`
        }).then((response)=>{
            alert('삭제가 완료되었습니다.');
            history.push(`/admin`);
        }).catch((error)=>{
            alert('오류로 인하여 삭제하지 못하였습니다.');
            history.push(`/admin`);
        })
    }

    return (
        <div>
            <div id="wrapper">
                <div id="main">
                    <div className="inner">
                        <header id="header">
                            {admin && <a href="/admin" className="logo"><strong>Hawaiian-Pizza</strong> INVENTORY</a>}
                            {user && <a href="/main" className="logo"><strong>Hawaiian-Pizza</strong> INVENTORY</a>}
                            <ul className="icons">
                                {admin && <li>{admin.name}님 안녕하세요.</li>}
                                {admin && <li><a href="/" onClick={onAdminLogoutHandler}>로그아웃</a></li> }
                                {user && <li>{user.name}님 안녕하세요.</li>}
                                {user && <li><a href="/" onClick={onUserLogoutHandler}>로그아웃</a></li> }
                            </ul>
                        </header>

                        <div className="product_read_container">

                            <Paper className={classes.paper}>
                                <div className="product_read_inner">

                                    <div className="product_read_row">

                                        <img src={`data:image/png;base64,${product.picture}`} alt="" />
                                    </div>

                                    {/* 카테고리 */}
                                    <div className="product_read_row">
                                        <div>카테고리</div>
                                        <div>
                                            {product.category}
                                        </div>
                                    </div>


                                    {/* 구입처 */}
                                    <div className="product_read_row">
                                        <div>구입처</div>
                                        <div>
                                            {product.buy}
                                        </div>
                                    </div>


                                    {/* 제조사 */}
                                    <div className="product_read_row">
                                        <div>제조사</div>
                                        <div>
                                            {product.manufacturer}
                                        </div>
                                    </div>


                                    {/* 제품명 */}
                                    <div className="product_read_row">
                                        <div>제품명</div>
                                        <div>
                                            {product.productname}
                                        </div>
                                    </div>


                                    {/* 가격 */}
                                    <div className="product_read_row">
                                        <div>가격</div>
                                        <div>
                                            {product.productname}
                                        </div>
                                    </div>


                                    {/* 전체 수량 */}
                                    <div className="product_read_row">
                                        <div>전체 수량</div>
                                        <div>
                                            {product.quantity}
                                        </div>
                                    </div>

                                    {/* 남은 수량 */}
                                    <div className="product_read_row">
                                        <div>전체 수량</div>
                                        <div>
                                            {product.stock}
                                        </div>
                                    </div>

                                    <hr />
                                    <h3>사용로그</h3>
                                    {logs.length !== 0 ?
                                        <table className="log_table">
                                            <colgroup>
                                                <col style={{ width: "30%" }} />
                                                <col style={{ width: "10%" }} />
                                                <col style={{ width: "15%" }} />
                                                <col style={{ width: "10%" }} />
                                                <col style={{ width: "25%" }} />
                                                <col style={{ width: "10%" }} />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>이름</td>
                                                    <td>전화번호</td>
                                                    <td>날짜</td>
                                                    <td>갯수</td>
                                                    <td>상태</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {logs.map((log) => (
                                                    <tr key={log.id}>
                                                        <td>{log.user.id}</td>
                                                        <td>{log.user.name}</td>
                                                        <td>{log.user.tel}</td>
                                                        <td>{log.timestamp.substring(0,10)}-{log.timestamp.substring(11)}</td>
                                                        <td>{log.quantity}</td>
                                                        <td>{log.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table> : <>로그가 없습니다.</>
                                    }

                                    {admin && <button className="update_btn" onClick={onMoveUpdateHandler}>수정하기</button>}
                                    {admin && <button className="delete_btn" onClick={onProductDeleteHandler}>삭제하기</button>}
                                    {admin && <button className="back_btn" onClick={onAdminBackHandler}>메인으로 가기</button>}
                                    {user && <button className="back_btn" onClick={onUserBackHandler}>메인으로 가기</button>}
                                </div>
                            </Paper>



                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        width: "100%",
    },

}));