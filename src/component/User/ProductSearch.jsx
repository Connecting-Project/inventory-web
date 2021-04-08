import React, {useState} from 'react';
import axios from 'axios';
import constants from '../../lib/constants';
import '../../assets/css/product.css';

function ProductSearch({setProductlist , setProductCount, setProductPageNo}) {

    const [name , setName] = useState('');
    const [productSearchSelect, setProductSearchSelect] = useState('제품명');



    const onEnterhandler = (e) => {
        if(e.key === "Enter"){

            if(productSearchSelect === '제품명'){
                axios({
                    method: `GET`,
                    url: constants.BackUrl + `/api/vi/inventory/products/name?name=${name}`
                }).then((response)=>{
                    setProductlist(response.data.list);
                    setProductCount(Math.ceil(response.data.list_num/10));
                    setName('');
                }).catch((error)=>{
                    console.log(error);
                });
            }else if(productSearchSelect === 'Sn'){
                axios({
                    method: `GET`,
                    url: constants.BackUrl + `/api/vi/inventory/products/sn?sn=${name}`
                }).then((response)=>{
                    console.log(response);
                    setProductlist(response.data);
                    setProductCount(1);
                    setName('');
                }).catch((error)=>{
                    console.log(error);
                });
            }else if(productSearchSelect === '카테고리'){
                axios({
                    method: `GET`,
                    url: constants.BackUrl + `/api/vi/inventory/products/category?category=${name}`
                }).then((response)=>{
                    setProductlist(response.data.list);
                    setProductCount(Math.ceil(response.data.list_num/10));
                    setName('');
                }).catch((error)=>{
                    console.log(error);
                });
            }
            
            setProductPageNo(1);
        }
    }

    const onSelectHandler =(e) =>{
        setProductSearchSelect(e.target.value);
    }

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    return (
        <div className="product_search">
            <select className="product_search_select" name="productSearchSelect" onChange={onSelectHandler}>
                <option value="제품명">제품명</option>
                <option value="카테고리">카테고리</option>
                <option value="Sn">Sn</option>
            </select>
            <input type="text" className="product_search_bar" name="productSearchBar" value={name} placeholder="Search" onChange={onNameChange} onKeyPress={onEnterhandler} />
        </div>
    )
}

export default ProductSearch;