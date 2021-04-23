import React, { useEffect, useState } from 'react';
import axios from "axios";

import sessionStorageCustom from '../lib/sessionStorageCustom';
import constants from '../lib/constants';
import { useLocation, useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Header from '../component/Header';
import "../assets/css/product.css";

import { BarcodeQrCode } from '@grapecity/wijmo.react.barcode.common';

function ProductDetail() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const admin = sessionStorageCustom.getJsonItem('admin');
    const user = sessionStorageCustom.getJsonItem('user');

    const [open, setOpen] = useState(false);
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
    const [rentNum, setRentNum] = useState(0);

    useEffect(() => {
        axios({
            method: `GET`,
            url: constants.BackUrl + `/api/vi/inventory/products/detail?id=${location.pathname.substring(9)}`
        }).then((response) => {
            setProduct(response.data.product);
            setLogs(response.data.logs);
        }).catch((error) => {
            console.log(error);
        });
    }, [location]);

    const onAdminBackHandler = () => {
        history.push(`/admin`);
    }

    const onUserBackHandler = () => {
        window.history.back();
    }

    const onMoveUpdateHandler = () => {
        history.push(`/product/update/${location.pathname.substring(9)}`);
    }

    const onProductDeleteHandler = () => {
        axios({
            method: `DELETE`,
            url: constants.BackUrl + `/api/vi/inventory/products/?sn=${product.sn}`
        }).then((response) => {
            alert('삭제가 완료되었습니다.');
            history.push(`/admin`);
        }).catch((error) => {
            alert('오류로 인하여 삭제하지 못하였습니다.');
            history.push(`/admin`);
        })
    }

    const onRentChangeHandler = (e) => {

        if(Number(e.nativeEvent.data) >= 0 && Number(e.nativeEvent.data) <= 9){
            if(e.target.value.replace(/(^0+)/,"") > product.stock){
                setRentNum(product.stock);
            }else{
                setRentNum(e.target.value.replace(/(^0+)/,""));
            }
        }
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onProductRentHandler = () => {
        if(rentNum === 0){
            alert("0개는 대여불가능합니다.");
        }else{
            axios({
                method:`POST`,
                url: constants.BackUrl + `/api/vi/inventory/devices/rent?num=${rentNum}&pro_id=${product.id}&user_id=${user.id}`
            }).then((response)=>{
                setOpen(false);
                setRentNum(0);
                history.push(`/product/${product.id}`);
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    return (
        <div>
            <div id="wrapper">
                <div id="main">
                    <div className="inner">
                        <Header />

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
                                            {product.price}
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
                                        <div>남은 수량</div>
                                        <div>
                                            {product.stock}
                                        </div>
                                    </div>

                                    <hr />
                                    <h3>사용로그</h3>
                                    <table className="log_table">
                                            <colgroup>
                                                <col style={{ width: "15%" }} />
                                                <col style={{ width: "25%" }} />
                                                <col style={{ width: "20%" }} />
                                                <col style={{ width: "25%" }} />
                                                <col style={{ width: "15%" }} />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <td>이름</td>
                                                    <td>전화번호</td>
                                                    <td>날짜</td>
                                                    <td>갯수</td>
                                                    <td>상태</td>
                                                </tr>
                                            </thead>
                                    </table>
                                    {logs.length !== 0 ?
                                        <div className="log_table_container">
                                        <table className="log_table">
                                            <colgroup>
                                                <col style={{ width: "15%" }} />
                                                <col style={{ width: "25%" }} />
                                                <col style={{ width: "20%" }} />
                                                <col style={{ width: "25%" }} />
                                                <col style={{ width: "15%" }} />
                                            </colgroup>
                                            <tbody>
                                                {logs.map((log) => (
                                                    <tr key={log.id}>
                                                        <td>{log.user.name}</td>
                                                        <td>{log.user.tel}</td>
                                                        <td>{log.timestamp.substring(0, 10)}-{log.timestamp.substring(11)}</td>
                                                        <td>{log.quantity}</td>
                                                        <td>{log.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        </div> : <h5 style={{textAlign: 'center', marginTop: '30px'}}>로그가 없습니다.</h5>

                                        
                                    }

                                    <h3>QR코드</h3>
                                    
                                    <BarcodeQrCode value={`https://inventory.hawaiian-pizza.ml/product/${product.id}`}/>
                                   

                                    {admin && <button className="update_btn" onClick={onMoveUpdateHandler}>수정하기</button>}
                                    {admin && <button className="delete_btn" onClick={onProductDeleteHandler}>삭제하기</button>}
                                    {admin && <button className="back_btn" onClick={onAdminBackHandler}>메인으로 가기</button>}
                                    {user && <button className="update_btn" onClick={handleOpen}>대여하기</button>}
                                    {user && <button className="back_btn" onClick={onUserBackHandler}>메인으로 가기</button>}
                                </div>
                            </Paper>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={open}>
                                    <div className={classes.modalpaper}>
                                        <h2 id="transition-modal-title">대여할 개수를 입력해주세요.</h2>
                                        <h3>남은 개수 : {product.stock}</h3>
                                        <input type="text" name="rentNum" value={rentNum} onChange={onRentChangeHandler} autoComplete='off'/>
                                        <button className="update_btn" onClick={onProductRentHandler}>대여</button>
                                        <button className="back_btn" onClick={()=>{setOpen(false)}}>취소</button>
                                    </div>
                                </Fade>
                            </Modal>


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

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalpaper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 'none',
    },
}));