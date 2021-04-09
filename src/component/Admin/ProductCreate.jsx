import React, { useState, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import constants from '../../lib/constants';
import {useHistory} from 'react-router-dom';
function ProductCreate() {
    const history = useHistory();
    const classes = useStyles();
    const imageUploader = useRef(null);
    const [product, setProduct] = useState({
        category: "",
        buy: "",
        manufacturer: "",
        productname: "",
        price: 0,
        quantity: 0
    });
    const [img, setImage] = useState(null);
    const [base64, setBase64] = useState('');

    const onProductCreateHandler = (e) => {
        const { name, value } = e.target;

        if (name === "price" || name === "quantity") {
            if (Number(e.nativeEvent.data) >= 0 && Number(e.nativeEvent.data) <= 9 && !(e.nativeEvent.data === " ")) {
                setProduct({
                    ...product,
                    [name]: value,
                })
            }
        } else {
            setProduct({
                ...product,
                [name]: value,
            })
        }

    }

    const onProductImageHandler = (e) => {
        
        if (e.target.files && e.target.files[0].size <= 20 * 1024 * 1024) {
            setImage(e.target.files[0]);
            var file = e.target.files[0];
            var reader = new FileReader();

            reader.addEventListener('load', ()=>{
                var dataIndex = reader.result.indexOf(',') + 1;
                var base64 = reader.result.substring(dataIndex,reader.result.length);
                //base64를 문자로 변환
                // var text = window.atob(base64);

                setBase64(base64);
                
            })

            reader.readAsDataURL(file);


        } else {
            alert("20Mb 이하의 이미지 파일을 업로드해주세요.")
        }
    }

    const onProductCreate = (e) => {

        if(product.buy === ""){
            alert("구입처를 입력해주세요.");
        }else if(product.category === ""){
            alert("카테고리를 선택해주세요.");
        }else if(product.manufacturer === ""){
            alert("제조사를 입력해주세요.");
        }else if(product.productname === ""){
            alert("제품명을 입력해주세요.");
        }else if(product.category === ""){
            alert("구입처를 입력해주세요.");
        }else if(product.price === 0 || product.price === ""){
            alert("가격을 입력해주세요.");
        }else if(product.quantity === 0 || product.quantity === ""){
            alert("수량을 입력해주세요.");
        }else if(img === null){
            alert("이미지를 업로드해주세요.")
        }else{
            axios({
                method:`POST`,
                url: constants.BackUrl + `/api/vi/inventory/products/c`,
                data:{
                    buy: product.buy,
                    category: product.category,
                    manufacturer: product.manufacturer,
                    picture: base64,
                    productname: product.productname,
                    price: product.price,
                    quantity: product.quantity,
                    stock: product.quantity
                },
            }).then((response)=>{
                history.push(`/admin`);
            }).catch((error)=>{
                console.log(error);
            })
        }
        
    }

    return (
        <Paper className={classes.paper}>
            <div className="product_create_inner">
                {/* 카테고리 */}
                <div className="product_create_row">
                    <div>카테고리</div>
                    <div>
                        <select name="category" onChange={onProductCreateHandler}>
                            <option value="">선택</option>
                            <option value="컴퓨터">컴퓨터</option>
                            <option value="서버">서버</option>
                            <option value="네트워크">네트워크</option>
                            <option value="주변기기">주변기기</option>
                            <option value="센서">센서</option>
                            <option value="전기부품">전기부품</option>
                            <option value="엑추에이터">엑추에이터</option>
                            <option value="오픈소스 H/W">오픈소스 H/W</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                </div>


                {/* 구입처 */}
                <div className="product_create_row">
                    <div>구입처</div>
                    <div>
                        <input type="text" name="buy" value={product.buy} onChange={onProductCreateHandler} />
                    </div>
                </div>


                {/* 제조사 */}
                <div className="product_create_row">
                    <div>제조사</div>
                    <div>
                        <input type="text" name="manufacturer" value={product.manufacturer} onChange={onProductCreateHandler} />
                    </div>
                </div>


                {/* 제품명 */}
                <div className="product_create_row">
                    <div>제품명</div>
                    <div>
                        <input type="text" name="productname" value={product.productname} onChange={onProductCreateHandler} />
                    </div>
                </div>


                {/* 가격 */}
                <div className="product_create_row">
                    <div>가격</div>
                    <div>
                        <input type="text" name="price" value={product.price} onChange={onProductCreateHandler} />
                    </div>
                </div>


                {/* 수량 */}
                <div className="product_create_row">
                    <div>수량</div>
                    <div>
                        <input type="text" name="quantity" value={product.quantity} onChange={onProductCreateHandler} />
                    </div>
                </div>

                {/* 이미지 */}
                <div className="product_create_row">
                    <div>이미지</div>
                    <div>
                        <input type='file' ref={imageUploader} className="imguploader" accept="image/jpeg, image/png" onChange={onProductImageHandler} />
                        <button onClick={() => {imageUploader.current.click();}}>이미지 업로드</button>
                        <span className="product_img_name">{img !== null ? img.name : <></>}</span>
                    </div>
                </div>

                {/* 등록 */}
                <div className="product_create_btn">
                    <button onClick={onProductCreate}>등록</button>
                </div>
            </div>
        </Paper>
    )
}

export default ProductCreate;

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        width: "100%",
    },

}));