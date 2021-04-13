import React, { useEffect, useState } from 'react';
import Header from '../component/Header';

import sessionStorageCustom from '../lib/sessionStorageCustom';
import axios from 'axios';
import constants from '../lib/constants';
import { useLocation, useHistory } from 'react-router-dom';

import DevicesPage from '../component/User/DevicesPage';

function UserPage() {
    const location = useLocation();
    const history = useHistory();

    const user = sessionStorageCustom.getJsonItem('user');
    const [logs, setLogs] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        axios({
            method: `POST`,
            url: constants.BackUrl + `/api/vi/inventory/devices/user-device?user_id=${user.id}`
        }).then((response) => {
            setLogs(response.data.list);
            setPageNo(1);
            setPageCount(Math.ceil(response.data.size / 10));
        }).catch((error) => {
            console.log(error);
        })
    }, [location, user.id])

    const onReturnHandler = (id) => {
        axios({
            method: `POST`,
            url: constants.BackUrl + `/api/vi/inventory/devices/return?device_id=${id}`
        }).then((response) => {

            alert("반납이 완료되었습니다.");
            axios({
                method: `POST`,
                url: constants.BackUrl + `/api/vi/inventory/devices/user-device?user_id=${user.id}`
            }).then((response) => {
                setLogs(response.data.list);
                setPageNo(1);
                setPageCount(Math.ceil(response.data.size / 10));
            }).catch((error) => {
                console.log(error);
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    const onGoProductDetail = (id) => {
        history.push(`/product/${id}`);
    }

    return (
        <div>
            <div id="wrapper">
                <div id="main">
                    <div className="inner">

                        <Header />
                        <h3 style={{ margin: '20px 0' }}>대여 목록</h3>
                        <div>
                            <table className="device_table">
                                <thead>
                                    <tr>
                                        <th>카테고리</th>
                                        <th>구입처</th>
                                        <th>제조사</th>
                                        <th>제품명</th>
                                        <th>개수</th>
                                        <th>반납</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs && logs.length !== 0 &&
                                        logs.map((log, index) => {
                                            if ((pageNo - 1) * 10 <= index && index < pageNo * 10) {
                                                return (
                                                    <tr key={log.id} className="product_list_product" onClick={() => { onGoProductDetail(log.product.id) }}>
                                                        <td>{log.product.category}</td>
                                                        <td>{log.product.buy}</td>
                                                        <td>{log.product.manufacturer}</td>
                                                        <td>{log.product.productname}</td>
                                                        <td>{log.quantity}</td>
                                                        <td><button onClick={(e) => { e.stopPropagation(); onReturnHandler(log.id) }}>반납하기</button></td>
                                                    </tr>
                                                )
                                            } else {
                                                return null;
                                            }
                                        }

                                        )
                                    }
                                </tbody>
                            </table>
                            {logs.length === 0 && <h3 style={{ textAlign: 'center', marginTop: '40px' }}>대여한 물품이 없습니다.</h3>}
                            <DevicesPage pageNo={pageNo} setPageNo={setPageNo} pageCount={pageCount} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default UserPage;